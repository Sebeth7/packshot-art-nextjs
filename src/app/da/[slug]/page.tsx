import { createServerSupabase, createServiceSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

// ISR avec revalidation toutes les 30 minutes
export const revalidate = 1800

interface DAPageProps {
  params: Promise<{
    slug: string
  }>
}

// Génération statique des pages populaires
export async function generateStaticParams() {
  const supabase = createServiceSupabase()
  
  // Récupérer les 50 DAs les plus populaires pour pré-génération
  const { data: das } = await supabase
    .from('design_aesthetics')
    .select('page_slug, id')
    .eq('active', true)
    .not('page_slug', 'is', null)
    .limit(50)

  if (!das) return []

  return das.map((da) => ({
    slug: da.page_slug || da.id,
  }))
}

async function getDABySlug(slug: string) {
  const supabase = await createServerSupabase()
  
  // Chercher par slug d'abord, puis par ID si pas trouvé
  let { data: da, error } = await supabase
    .from('design_aesthetics')
    .select(`
      id, 
      name, 
      description,
      prompt_used,
      alt_text, 
      title_tag,
      meta_description,
      seo_keywords,
      image_url,
      google_drive_url, 
      page_slug, 
      price_credits,
      product,
      type,
      ai_generated,
      created_at
    `)
    .eq('page_slug', slug)
    .eq('active', true)
    .single()

  // Fallback: chercher par ID si slug non trouvé
  if (error && error.code === 'PGRST116') {
    const { data: daById, error: errorById } = await supabase
      .from('design_aesthetics')
      .select(`
        id, 
        name, 
        description,
        prompt_used,
        alt_text, 
        title_tag,
        meta_description,
        seo_keywords,
        image_url,
        google_drive_url, 
        page_slug, 
        price_credits,
        product,
        type,
        ai_generated,
        created_at
      `)
      .eq('id', slug)
      .eq('active', true)
      .single()
    
    da = daById
    error = errorById
  }

  if (error || !da) {
    return null
  }

  return da
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: DAPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const da = await getDABySlug(resolvedParams.slug)

  if (!da) {
    return {
      title: 'Direction Artistique Non Trouvée | Packshot.art'
    }
  }

  const title = da.title_tag || `${da.name} | Packshot.art`
  const description = da.meta_description || da.description?.substring(0, 155) || 'Direction artistique professionnelle pour packshot.'

  return {
    title,
    description,
    keywords: da.seo_keywords || ['packshot', 'direction artistique', 'retouche photo'],
    openGraph: {
      title,
      description,
      images: da.image_url ? [{ url: da.image_url, alt: da.alt_text || da.name }] : [],
      url: `https://packshot.art/da/${resolvedParams.slug}`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: da.image_url ? [da.image_url] : []
    }
  }
}

export default async function DAPage({ params }: DAPageProps) {
  const resolvedParams = await params
  const da = await getDABySlug(resolvedParams.slug)

  if (!da) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              Packshot.art
            </Link>
            <nav className="space-x-6">
              <Link href="/catalogue" className="text-slate-600 hover:text-slate-900">
                ← Retour au catalogue
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image */}
            <div className="space-y-4">
              {da.image_url && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image 
                    src={da.image_url} 
                    alt={da.alt_text || da.name}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain max-h-[600px]"
                    priority
                  />
                </div>
              )}
              
              {/* Infos techniques */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Informations Techniques</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Type:</span>
                    <span className="font-medium">{da.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">IA Généré:</span>
                    <span className="font-medium">{da.ai_generated ? 'Oui' : 'Non'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">ID:</span>
                    <span className="font-mono text-xs">{da.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Détails */}
            <div className="space-y-6">
              
              {/* Header produit */}
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  {da.name}
                </h1>
                
                {/* Tags produits */}
                {da.product && Array.isArray(da.product) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {da.product.map((prod: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        {prod.replace('bijoux-', '').replace('lunettes-', '')}
                      </span>
                    ))}
                  </div>
                )}

                {/* Prix */}
                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  {da.price_credits} crédits
                </div>
              </div>

              {/* Description */}
              {da.description && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Description</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {da.description}
                  </p>
                </div>
              )}

              {/* Prompt IA */}
              {da.prompt_used && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Prompt de Génération IA</h3>
                  <p className="text-slate-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-md">
                    {da.prompt_used}
                  </p>
                </div>
              )}

              {/* Mots-clés SEO */}
              {da.seo_keywords && Array.isArray(da.seo_keywords) && da.seo_keywords.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Mots-clés</h3>
                  <div className="flex flex-wrap gap-2">
                    {da.seo_keywords.map((keyword: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Commander cette Direction Artistique</h3>
                <p className="text-slate-600 mb-4">
                  Transformez vos packshots avec cette direction artistique professionnelle.
                </p>
                <Link 
                  href="/dashboard"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors block text-center"
                >
                  Commander maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}