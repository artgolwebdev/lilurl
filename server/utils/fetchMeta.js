// fetchMeta.js - fetches meta title, description, and image from a URL
import fetch from 'node-fetch';

export default async function fetchMeta(url) {
  try {
    const res = await fetch(url, { timeout: 5000 });
    const html = await res.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const metaTitle = titleMatch ? titleMatch[1] : '';
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const metaDescription = descMatch ? descMatch[1] : '';
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const metaImage = ogImageMatch ? ogImageMatch[1] : '';
    return { metaTitle, metaDescription, metaImage };
  } catch (e) {
    return { metaTitle: '', metaDescription: '', metaImage: '' };
  }
}
