import type { MetadataRoute } from 'next';
import { SITE, ROUTES } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.path === '/' ? 'monthly' : 'yearly',
    priority: route.path === '/' ? 1 : route.path === '/projects' ? 0.9 : 0.8,
  }));
}
