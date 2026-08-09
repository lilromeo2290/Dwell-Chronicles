import type { MetadataRoute } from 'next'
import { PrismaClient } from '@prisma/client'

const SITE_URL = 'https://dwellchroniclesgh.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const prisma = new PrismaClient()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: SITE_URL + '/properties',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: SITE_URL + '/airbnb',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Property detail pages
  const propertyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const propertyPages: MetadataRoute.Sitemap = propertyIds.map((id) => ({
    url: SITE_URL + '/property/' + id,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Airbnb apartment pages from DB
  let apartmentPages: MetadataRoute.Sitemap = []
  try {
    const apartments = await prisma.apartment.findMany({
      where: { status: 'published' },
      select: { id: true, updatedAt: true },
    })
    apartmentPages = apartments.map((apt) => ({
      url: SITE_URL + '/airbnb/' + apt.id,
      lastModified: apt.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // DB not available, skip dynamic pages
  } finally {
    await prisma.$disconnect()
  }

  return [...staticPages, ...propertyPages, ...apartmentPages]
}