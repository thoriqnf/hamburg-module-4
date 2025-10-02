import { Metadata } from 'next';
import ProductsPage from './ProductsPage';

// TODO 21: Add metadata for SEO
// Generate proper metadata for search engines and social sharing
export const metadata: Metadata = {
  title: 'Products - Our Product Catalog',
  description: 'Browse our complete catalog of products. Find electronics, clothing, home goods, and more with detailed information and pricing.',
  keywords: ['products', 'catalog', 'shopping', 'electronics', 'clothing', 'home goods'],
  openGraph: {
    title: 'Products - Our Product Catalog',
    description: 'Browse our complete catalog of products with detailed information and pricing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - Our Product Catalog',
    description: 'Browse our complete catalog of products with detailed information and pricing.',
  },
};

export default ProductsPage;