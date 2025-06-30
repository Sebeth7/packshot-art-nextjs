import { createServerSupabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

// Page catalogue avec ISR - se régénère toutes les 30 minutes
export const revalidate = 1800

async function CatalogueContent() {
  const supabase = await createServerSupabase()
  
  // Récupérer toutes les DAs actives avec leurs métadonnées SEO
  const { data: das, error } = await supabase
    .from('design_aesthetics')
    .select(`
      id, 
      name, 
      description,
      alt_text, 
      title_tag,
      meta_description,
      image_url, 
      page_slug, 
      price_credits,
      product,
      type,
      seo_keywords
    `)
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching DAs:', error)
    return <div>Erreur lors du chargement du catalogue</div>
  }

  // Grouper par type de produit pour navigation
  const productGroups = das?.reduce((groups: Record<string, typeof das>, da) => {
    if (da.product && Array.isArray(da.product)) {
      da.product.forEach((prod: string) => {
        const category = prod.split('-')[1] || prod // "bijoux-bagues" -> "bagues"
        if (!groups[category]) groups[category] = []
        groups[category].push(da)
      })
    }
    return groups
  }, {}) || {}

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
              <Link href="/catalogue" className="text-indigo-600 font-medium">
                Catalogue
              </Link>
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Catalogue des Directions Artistiques
          </h1>
          <p className="text-xl text-slate-600">
            {das?.length || 0} directions artistiques professionnelles disponibles
          </p>
          
          {/* Filtres rapides par catégorie */}
          <div className="mt-8 flex flex-wrap gap-3">
            {Object.keys(productGroups).map((category) => (
              <span key={category} className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {category} ({productGroups[category].length})
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des DAs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {das?.map((da) => (
              <div key={da.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {da.image_url && (
                  <Link href={`/da/${da.page_slug || da.id}`}>
                    <Image 
                      src={da.image_url} 
                      alt={da.alt_text || da.name}
                      width={300}
                      height={192}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                )}
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                    {da.name}
                  </h3>
                  
                  {da.description && (
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      {da.description.substring(0, 100)}...
                    </p>
                  )}
                  
                  {/* Tags produits */}
                  {da.product && Array.isArray(da.product) && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {da.product.slice(0, 2).map((prod: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {prod.split('-')[1] || prod}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      {da.price_credits} crédits
                    </span>
                    
                    <Link 
                      href={`/da/${da.page_slug || da.id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Loading component
function CatalogueLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Page principale avec métadonnées SEO
export async function generateMetadata() {
  return {
    title: 'Catalogue des Directions Artistiques | Packshot.art',
    description: '311 directions artistiques professionnelles pour vos packshots. Bijoux, montres, lunettes - Retouche IA + expertise manuelle.',
    keywords: ['catalogue', 'packshot', 'direction artistique', 'bijoux', 'montres', 'lunettes', 'retouche photo'],
    openGraph: {
      title: 'Catalogue Packshot.art - 311 Directions Artistiques',
      description: 'Découvrez notre catalogue complet de directions artistiques pour packshots professionnels.',
      url: 'https://packshot.art/catalogue',
      type: 'website'
    }
  }
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<CatalogueLoading />}>
      <CatalogueContent />
    </Suspense>
  )
}