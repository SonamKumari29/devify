import { CategoryPageContent } from '@/components/CategoryPageContent';
import { categories } from '@/lib/api';

export function generateStaticParams() {
  return [
    { categoryId: 'all' },
    { categoryId: 'web-development' },
    { categoryId: 'javascript' },
    { categoryId: 'python' },
    { categoryId: 'artificial-intelligence' },
    { categoryId: 'cloud-computing' },
    { categoryId: 'mobile-development' },
    { categoryId: 'devops' },
    { categoryId: 'cybersecurity' },
    { categoryId: 'blockchain' }
  ];
}

export default function CategoryPage({ params }: { params: { categoryId: string } }) {
  // Map URL-friendly categoryId to API category
  const categoryMap: { [key: string]: string } = {
    'web-development': 'webdev',
    'artificial-intelligence': 'ai',
    'cloud-computing': 'cloud',
    'mobile-development': 'mobile',
    'cybersecurity': 'security'
  };

  const apiCategory = categoryMap[params.categoryId] || params.categoryId;
  return <CategoryPageContent categoryId={apiCategory} />;
} 