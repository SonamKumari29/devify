"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const tags = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'REST API'
];

export function FilterTags({ onTagSelect }: { onTagSelect: (tag: string) => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const isSelected = prev.includes(tag);
      if (isSelected) {
        onTagSelect(tag);
        return prev.filter(t => t !== tag);
      } else {
        onTagSelect(tag);
        return [...prev, tag];
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Badge
            variant="outline"
            className={`cursor-pointer transition-all duration-300 hover:bg-[#00FFC2] hover:text-black
              ${selectedTags.includes(tag) 
                ? 'bg-[#00FFC2] text-black border-[#00FFC2]' 
                : 'text-[#00FFC2] border-[#00FFC2]/50'}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}