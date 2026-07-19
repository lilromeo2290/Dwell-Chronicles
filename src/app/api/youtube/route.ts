import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

// Cache for 10 minutes
let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000;

export async function GET() {
  // Return cached data if still valid
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    // Step 1: Get channel ID from handle
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=dwellchronicles&key=${YOUTUBE_API_KEY}`
    );

    if (!channelRes.ok) {
      throw new Error(`YouTube API error: ${channelRes.status}`);
    }

    const channelData = await channelRes.json();

    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { videos: [], channelUrl: 'https://www.youtube.com/@dwellchronicles/featured' },
        { status: 200 }
      );
    }

    const channel = channelData.items[0];
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    // Step 2: Get uploaded videos
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status&maxResults=8&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );

    if (!videosRes.ok) {
      throw new Error(`YouTube playlist API error: ${videosRes.status}`);
    }

    const videosData = await videosRes.json();

    const videos = (videosData.items || [])
      .filter((item: any) => item.status?.privacyStatus === 'public')
      .map((item: any) => {
        const snippet = item.snippet;
        const videoId = snippet.resourceId?.videoId || '';
        return {
          videoId,
          title: snippet.title,
          thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
          publishedAt: snippet.publishedAt,
          description: snippet.description,
          channelTitle: snippet.channelTitle,
        };
      });

    const result = {
      videos,
      channelUrl: 'https://www.youtube.com/@dwellchronicles/featured',
    };

    // Cache the result
    cache = { data: result, timestamp: Date.now() };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('YouTube API fetch error:', error.message);
    return NextResponse.json(
      { videos: [], channelUrl: 'https://www.youtube.com/@dwellchronicles/featured', error: 'Failed to fetch videos' },
      { status: 200 }
    );
  }
}