import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const baseUrl = SITE_URL;
  
  return [
    {
      url: baseUrl,
      lastModified: '2026-09-25',
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: '2026-09-25',
    },
  ];
}

