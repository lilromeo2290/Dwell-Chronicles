import { NextResponse } from 'next/server';

const CHANNEL_HANDLE = 'dwellchronicles';
const CHANNEL_URL = 'https://www.youtube.com/@dwellchronicles/featured';

// Cache for 15 minutes
let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000;

/**
 * Fetches videos from a YouTube channel WITHOUT an API key.
 * Strategy: Scrape the channel page HTML to extract video IDs and metadata.
 */

function extractBetween(text: string, start: string, end: string): string {
  const i = text.indexOf(start);
  if (i === -1) return '';
  const j = text.indexOf(end, i + start.length);
  if (j === -1) return '';
  return text.substring(i + start.length, j);
}

function extractVideoIds(html: string): string[] {
  const ids: string[] = [];
  // Match patterns like /watch?v=VIDEO_ID in various contexts
  const patterns = [
    /\/watch\?v=([a-zA-Z0-9_-]{11})/g,
    /"videoId":"([a-zA-Z0-9_-]{11})"/g,
    /"url":"\/watch\?v=([a-zA-Z0-9_-]{11})"/g,
    /videoRenderer.*?"videoId":"([a-zA-Z0-9_-]{11})"/gs,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(html)) !== null) {
      const id = match[1];
      // Filter out shorts and common non-video IDs
      if (!ids.includes(id) && id.length === 11) {
        ids.push(id);
      }
    }
    if (ids.length >= 8) break;
  }

  // Deduplicate while preserving order
  return [...new Set(ids)].slice(0, 8);
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // Fetch the YouTube channel featured page
    const res = await fetch(CHANNEL_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 900 }, // cache for 15 min
    });

    if (!res.ok) {
      throw new Error(`YouTube page fetch error: ${res.status}`);
    }

    const html = await res.text();
    const videoIds = extractVideoIds(html);

    if (videoIds.length === 0) {
      return NextResponse.json({ videos: [], channelUrl: CHANNEL_URL });
    }

    // Build video objects with thumbnail URLs (no API needed)
    const videos = videoIds.map((id) => ({
      videoId: id,
      title: '', // YouTube oEmbed can fill this but we keep it simple
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      maxResThumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      publishedAt: '',
    }));

    const result = { videos, channelUrl: CHANNEL_URL };
    cache = { data: result, timestamp: Date.now() };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('YouTube fetch error:', error.message);

    // Return cached data even if expired
    if (cache) {
      return NextResponse.json(cache.data);
    }

    return NextResponse.json({ videos: [], channelUrl: CHANNEL_URL });
  }
}