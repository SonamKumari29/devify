export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
  tags: string[];
  reactions?: number;
}

const ITEMS_PER_PAGE = 50;

// Predefined tech-related images
const TECH_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop'
];

// Get a consistent image based on article ID
function getTechImage(id: string): string {
  const index = parseInt(id.replace(/[^\d]/g, '').slice(-1)) % TECH_IMAGES.length;
  return TECH_IMAGES[index];
}

export async function fetchDevToArticles(tag?: string, page: number = 1): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      per_page: ITEMS_PER_PAGE.toString(),
      page: page.toString(),
      top: '1',
    });
    
    if (tag && tag !== 'all') {
      params.append('tag', tag.toLowerCase());
    }

    const response = await fetch(`https://dev.to/api/articles?${params}`);
    const data = await response.json();

    return data.map((article: any) => {
      const tags = article.tags?.split(',').map((tag: string) => tag.trim().toLowerCase()) || [];
      return {
        id: article.id.toString(),
        title: article.title,
        description: article.description || '',
        url: article.url,
        publishedAt: article.published_at,
        source: 'Dev.to',
        imageUrl: article.cover_image || getTechImage(article.id.toString()),
        tags,
        reactions: article.public_reactions_count || 0
      };
    });
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    return [];
  }
}

export async function fetchHackerNewsArticles(page: number = 1): Promise<Article[]> {
  try {
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStories = await topStoriesResponse.json();
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageStories = topStories.slice(start, end);

    const articles = await Promise.all(
      pageStories.map(async (id: number) => {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const story = await storyResponse.json();
        
        // Skip stories without URLs as they're usually discussions
        if (!story.url) return null;
        
        const techKeywords = ['programming', 'tech', 'software', 'web', 'app', 'data', 'ai', 'cloud'];
        const titleWords = story.title.toLowerCase().split(' ');
        const autoTags = techKeywords.filter(keyword => 
          titleWords.some((word: string) => word.includes(keyword))
        );
        
        const tags = Array.from(new Set(['tech', 'programming', ...autoTags])).map(t => t.toLowerCase());
        
        return {
          id: story.id.toString(),
          title: story.title,
          description: story.text || `A trending discussion on ${tags.join(', ')} from the tech community.`,
          url: story.url,
          publishedAt: new Date(story.time * 1000).toISOString(),
          source: 'Hacker News',
          imageUrl: getTechImage(story.id.toString()),
          tags,
          reactions: story.score || 0
        };
      })
    );

    // Remove null entries and return valid articles
    return articles.filter((article): article is Article => article !== null);
  } catch (error) {
    console.error('Error fetching Hacker News articles:', error);
    return [];
  }
}

export const categories = [
  'all',
  'web-development',
  'javascript',
  'python',
  'artificial-intelligence',
  'cloud-computing',
  'mobile-development',
  'devops',
  'cybersecurity',
  'blockchain'
] as const;

export const categoryToApiMap: { [key: string]: string } = {
  'web-development': 'webdev',
  'artificial-intelligence': 'ai',
  'cloud-computing': 'cloud',
  'mobile-development': 'mobile',
  'cybersecurity': 'security'
};

export const tags = [
  'javascript',
  'python',
  'react',
  'node',
  'aws',
  'ai',
  'machinelearning',
  'cloud',
  'security',
  'blockchain',
  'webdev',
  'mobile',
  'devops'
] as const;

export async function fetchArticles(category?: string): Promise<Article[]> {
  try {
    // Convert URL-friendly category to API category
    const apiCategory = category ? (categoryToApiMap[category] || category) : undefined;

    const [devToArticles, hackerNewsArticles] = await Promise.all([
      fetchDevToArticles(apiCategory),
      fetchHackerNewsArticles()
    ]);

    const allArticles = [...devToArticles, ...hackerNewsArticles];
    
    // Sort articles by reactions since all articles now have images
    const sortedArticles = allArticles.sort((a, b) => 
      (b.reactions || 0) - (a.reactions || 0)
    );
    
    if (category && category !== 'all') {
      return sortedArticles.filter(article => 
        article.tags.some(tag => 
          tag.toLowerCase().includes(apiCategory?.toLowerCase() || '')
        )
      );
    }
    
    return sortedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    // Fetch articles from both sources
    const [devToArticles, hackerNewsArticles] = await Promise.all([
      fetchDevToArticles(),
      fetchHackerNewsArticles()
    ]);

    const allArticles = [...devToArticles, ...hackerNewsArticles];
    
    // If no query, return trending articles
    if (!query.trim()) {
      return allArticles.sort((a, b) => (b.reactions || 0) - (a.reactions || 0)).slice(0, 10);
    }

    // Search in title, description, and tags
    const searchResults = allArticles.filter(article => {
      const searchableText = [
        article.title.toLowerCase(),
        article.description.toLowerCase(),
        ...article.tags.map(tag => tag.toLowerCase())
      ].join(' ');
      
      return query.toLowerCase().split(' ').every(term => 
        searchableText.includes(term)
      );
    });

    // Sort by relevance (reactions) and limit to 10 results
    return searchResults.sort((a, b) => (b.reactions || 0) - (a.reactions || 0)).slice(0, 10);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}