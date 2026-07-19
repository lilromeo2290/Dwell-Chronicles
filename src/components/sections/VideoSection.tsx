'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Calendar,
  Youtube,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
  channelTitle: string;
}

const YOUTUBE_CHANNEL = 'https://www.youtube.com/@dwellchronicles/featured';

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function VideoSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
        }
      } catch {
        // Silently fall back to channel link
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const featuredVideo = videos[0];
  const sideVideos = videos.slice(1, 5);

  return (
    <section id="videos" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Video Gallery
          </h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Property tours, construction insights, and expert advice from our
            YouTube channel
          </p>
        </motion.div>

        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 aspect-video rounded-2xl bg-[#E5E3DC] animate-pulse" />
            <div className="lg:col-span-2 flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4 p-3">
                  <div className="w-40 h-24 rounded-lg bg-[#E5E3DC] animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-[#E5E3DC] rounded animate-pulse w-full" />
                    <div className="h-3 bg-[#E5E3DC] rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : videos.length > 0 ? (
          /* Videos from API */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Featured Video */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <a
                href={`https://www.youtube.com/watch?v=${featuredVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden relative aspect-video bg-[#2F3A33] group"
              >
                {/* Thumbnail */}
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-lg md:text-xl font-semibold leading-tight line-clamp-2">
                    {featuredVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-white/80 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featuredVideo.publishedAt)}
                  </div>
                </div>
              </a>
            </motion.div>

            {/* Video List */}
            <motion.div
              className="lg:col-span-2 flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {sideVideos.map((video) => (
                <motion.a
                  key={video.videoId}
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex gap-4 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group no-underline"
                >
                  {/* Thumbnail */}
                  <div className="w-40 h-24 rounded-lg overflow-hidden relative shrink-0 bg-[#2F3A33]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="font-medium text-sm text-[#2F3A33] line-clamp-2 group-hover:text-[#5F8768] transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-2 text-xs text-[#6B7A6F]">
                      <Calendar className="w-3 h-3" />
                      {formatDate(video.publishedAt)}
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Fallback: Channel Link Card */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-6 bg-white rounded-2xl p-10 md:p-14 shadow-sm hover:shadow-md transition-shadow group no-underline"
            >
              <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Youtube className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#2F3A33] mb-2">
                  Visit Our YouTube Channel
                </h3>
                <p className="text-[#6B7A6F] text-sm leading-relaxed max-w-md">
                  Watch property tours, construction updates, expert advice, and
                  real estate insights on the Dwell Chronicles YouTube channel.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Go to YouTube
              </span>
            </a>
          </motion.div>
        )}

        {/* Visit YouTube Button */}
        <div className="text-center mt-12">
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white rounded-xl px-8 py-3 font-medium transition-all cursor-pointer"
          >
            <Youtube className="w-5 h-5" />
            Visit Our YouTube Channel
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}