import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'check';

    if (action === 'videos') {
      const videos = await db.trackedVideo.findMany({
        orderBy: { publishedAt: 'desc' },
        take: 20,
      });
      return NextResponse.json({ videos });
    }

    // Check for new videos from YouTube
    const apiKeySetting = await db.systemSetting.findFirst({ where: { key: 'youtube_api_key' } });
    const channelIdSetting = await db.systemSetting.findFirst({ where: { key: 'youtube_channel_id' } });

    if (!apiKeySetting || !channelIdSetting) {
      return NextResponse.json({
        newVideos: [],
        message: 'YouTube API not configured. Set API key and channel ID in Settings.',
      });
    }

    const publishedAfter = await db.trackedVideo.findFirst({
      orderBy: { publishedAt: 'desc' },
      select: { publishedAt: true },
    });

    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' + channelIdSetting.value + '&maxResults=10&order=date&type=video&key=' + apiKeySetting.value;
    if (publishedAfter?.publishedAt) {
      url += '&publishedAfter=' + publishedAfter.publishedAt.toISOString();
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ newVideos: [], error: data.error.message }, { status: 400 });
    }

    const newVideos = [];
    if (data.items && Array.isArray(data.items)) {
      for (const item of data.items) {
        const videoId = item.id?.videoId;
        if (!videoId) continue;

        const existing = await db.trackedVideo.findUnique({ where: { videoId } });
        if (existing) continue;

        const video = await db.trackedVideo.create({
          data: {
            videoId,
            title: item.snippet?.title || 'Untitled',
            thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
            videoUrl: 'https://www.youtube.com/watch?v=' + videoId,
            description: item.snippet?.description || null,
            publishedAt: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt) : null,
            notified: false,
          },
        });
        newVideos.push(video);
      }
    }

    return NextResponse.json({ newVideos, totalChecked: data.items?.length || 0 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'YouTube check failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
