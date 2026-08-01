import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://enfinite-energy-core.vercel.app' // Replace with your actual production domain when you get one, e.g. https://www.enfiniteenergy.in

  // Define static routes
  const routes = [
    '',
    '/company',
    '/solutions',
    '/our-work',
    '/resources',
    '/news',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
