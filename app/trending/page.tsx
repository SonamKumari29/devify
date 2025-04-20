'use client';

import { useEffect, useState } from 'react';
import { Article, fetchDevToArticles, fetchHackerNewsArticles } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { NewsCard } from '@/components/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';
import { FilterTags } from '@/components/FilterTags';
import { Loader } from "@/components/ui/loader";

export default function TrendingPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const [devToArticles, hackerNewsArticles] = await Promise.all([
        fetchDevToArticles(selectedTags.length === 0 ? undefined : selectedTags[0], page),
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchArticles();
  }, [selectedTags]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles();
    }
  }, [page]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => {
      const isSelected = prev.includes(tag);
      if (isSelected) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const filteredArticles = articles.filter(article =>
    selectedTags.length === 0 || 
    article.tags.some(tag => 
      selectedTags.some(selectedTag => 
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      )
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Flame className="w-6 h-6 text-[#00FFC2]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00FFC2] to-[#00FFE5] bg-clip-text text-transparent">
          Trending Now
        </h1>
      </div>

      <div className="mb-8">
        <FilterTags onTagSelect={handleTagSelect} />
      </div>

      {loading && page === 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {hasMore && !loading && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setPage(prev => prev + 1)}
                className="bg-transparent hover:bg-primary/10 flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size="sm" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}

          {loading && page > 1 && (
            <div className="mt-8 flex justify-center">
              <Loader size="lg" />
            </div>
          )}
        </>
      )}
    </div>
  );
} 