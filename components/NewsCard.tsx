"use client";

import { motion } from "framer-motion";
import { ExternalLink, Clock, Tag, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Article } from "@/lib/api";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors bg-[#1A1A1A] border-[#00FFC2]/10 hover:border-[#00FFC2]/20">
        {article.imageUrl && (
          <div className="relative w-full h-40 sm:h-48">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader className="p-3 sm:p-4 md:p-6">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2 text-white group-hover:text-[#00FFC2] transition-colors">
              {article.title}
            </h3>
            {article.reactions !== undefined && (
              <div className="flex items-center gap-1 text-gray-400 shrink-0">
                <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="text-xs">{article.reactions}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 line-clamp-2 sm:line-clamp-3">
            {article.description}
          </p>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 md:p-6 flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-[#252525] text-[#00FFC2] border border-[#00FFC2]/10 truncate max-w-[100px] sm:max-w-[120px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center w-full text-[10px] sm:text-xs text-gray-400">
            <span className="truncate max-w-[120px] sm:max-w-none">{article.source}</span>
            <time className="shrink-0">{formatDistanceToNow(new Date(article.publishedAt))} ago</time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}