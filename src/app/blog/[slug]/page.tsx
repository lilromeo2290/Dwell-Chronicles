import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, articles } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const ogImage = 'https://dwellchroniclesgh.com' + article.img;
  const url = 'https://dwellchroniclesgh.com/blog/' + article.slug;

  return {
    title: article.title + ' | Dwell Chronicles Ghana',
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: url,
      siteName: 'Dwell Chronicles Ghana',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: article.title,
      }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = (article.content || '').split('\n\n').filter((p) => p.trim().length > 0);
  const isHeading = (p: string) => {
    const trimmed = p.trim();
    return trimmed.length < 80 && !trimmed.includes('.') && !trimmed.includes(',');
  };
  const images = article.images || (article.img ? [article.img] : []);

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      {/* Hero with image */}
      <div className="relative h-72 md:h-96">
        {images.length > 0 && (
          <img
            src={images[0]}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/50 to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 max-w-4xl mx-auto">
          <span className="inline-block bg-[#5F8768] text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-gray-300">
            {article.date} &middot; {article.readTime}
          </p>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((p, i) => {
              if (isHeading(p)) {
                return (
                  <h2 key={i} className="text-xl font-bold text-[#2F3A33] mt-10 mb-3">
                    {p.trim()}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-[#2F3A33] leading-relaxed mb-5 text-[15px]">
                  {p.trim()}
                </p>
              );
            })}
          </div>

          {/* Second image */}
          {images.length > 1 && (
            <div className="mt-10 rounded-xl overflow-hidden">
              <img
                src={images[1]}
                alt={article.title}
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC]">
            <p className="text-sm font-semibold text-[#2F3A33] mb-2">Contact Dwell Chronicles</p>
            <p className="text-sm text-[#6B7A6F] mb-3">
              Get expert consultation and support for your property needs.
            </p>
            <a
              href="https://wa.me/233204700023"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5F8768] text-white text-sm font-medium rounded-xl px-5 py-2.5 hover:bg-[#4A6B52] transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-[#5F8768] font-medium hover:underline"
          >
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}