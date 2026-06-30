import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.steadfaststudentservices.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal', '/admin', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
