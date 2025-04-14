'use client';

import { useEffect, useState } from 'react';
import { Article, fetchDevToArticles, fetchHackerNewsArticles, categories } from '@/lib/api';
import { NewsCard } from '@/components/NewsCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';

interface CategoryPageContentProps {
  categoryId: string;
}

export function CategoryPageContent({ categoryId }: CategoryPageContentProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const [devToArticles, hackerNewsArticles] = await Promise.all([
        fetchDevToArticles(categoryId === 'all' ? undefined : categoryId, page),
        fetchHackerNewsArticles(page)
      ]);

      const newArticles = [...devToArticles, ...hackerNewsArticles]
        .sort((a, b) => (b.reactions || 0) - (a.reactions || 0));

      if (page === 1) {
        setArticles(newArticles);
      } else {
        setArticles(prev => [...prev, ...newArticles]);
      }

      setHasMore(newArticles.length > 0);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchArticles();
  }, [categoryId]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles();
    }
  }, [page]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArticles = articles.filter(article =>
    selectedTags.length === 0 ||
    article.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <FolderOpen className="w-6 h-6 text-[#00FFC2]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00FFC2] to-[#00FFE5] bg-clip-text text-transparent">
          {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Articles
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => handleTagSelect(tag)}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Badge>
        ))}
      </div>

      {isLoading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {hasMore && !isLoading && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setPage(prev => prev + 1)}
                className="bg-transparent hover:bg-primary/10"
              >
                Load More
              </Button>
            </div>
          )}

          {isLoading && page > 1 && (
            <div className="mt-8 flex justify-center">
              <Skeleton className="h-10 w-32" />
            </div>
          )}
        </>
      )}
    </div>
  );
} 