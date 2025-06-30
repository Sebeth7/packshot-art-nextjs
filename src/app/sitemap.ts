import { MetadataRoute } from 'next'
import { createServiceSupabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServiceSupabase()
  
  // Récupérer toutes les DAs actives
  const { data: das } = await supabase
    .from('design_aesthetics')
    .select('page_slug, id, seo_updated_at')
    .eq('active', true)
    .not('page_slug', 'is', null)

  // URLs statiques
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://packshot.art',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://packshot.art/catalogue',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // URLs des DAs individuelles
  const daUrls: MetadataRoute.Sitemap = das?.map((da) => ({
    url: `https://packshot.art/da/${da.page_slug || da.id}`,
    lastModified: da.seo_updated_at ? new Date(da.seo_updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  return [...staticUrls, ...daUrls]
}