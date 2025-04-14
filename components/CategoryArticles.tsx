'use client';

import { useEffect, useState } from 'react';
import { NewsCard } from '@/components/NewsCard';
import { fetchDevToArticles, fetchHackerNewsArticles, type Article } from '@/lib/api';

interface CategoryArticlesProps {
  categoryId: string;
}

export function CategoryArticles({ categoryId }: CategoryArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [devToArticles, hackerNewsArticles] = await Promise.all([
          fetchDevToArticles(),
          fetchHackerNewsArticles()
        ]);

        const allArticles = [...devToArticles, ...hackerNewsArticles];
        
        const filteredArticles = categoryId === 'all' 
          ? allArticles 
          : allArticles.filter(article => 
              article.tags.some(tag => 
                tag.toLowerCase().includes(categoryId.toLowerCase())
              )
            );

        setArticles(filteredArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="col-span-full flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-[#00FFC2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-gray-400">
        No articles found for this category.
      </div>
    );
  }

  return (
    <>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </>
  );
} 