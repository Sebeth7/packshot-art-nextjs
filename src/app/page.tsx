import { createServerSupabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

// Homepage avec SSG + données Supabase
export default async function HomePage() {
  const supabase = await createServerSupabase()
  
  // Récupérer quelques DAs pour preview (pas de is_featured pour l'instant)
  const { data: featuredDAs, error } = await supabase
    .from('design_aesthetics')
    .select('id, name, alt_text, image_url, page_slug, price_credits')
    .eq('active', true)
    .limit(6)

  if (error) {
    console.error('Error fetching DAs:', error)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Packshot.art</h1>
          <p className="text-slate-300 mt-2">Retouche Photo Produit IA + Expertise Manuelle</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Vos packshots, augmentés
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Transformez vos packshots avec notre process unique : IA de pointe + retouches manuelles expertes.
          </p>
          <Link 
            href="/catalogue" 
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Découvrir le catalogue
          </Link>
        </div>
      </section>

      {/* Featured DAs Preview */}
      {featuredDAs && featuredDAs.length > 0 && (
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">
              Directions Artistiques Premium
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDAs.map((da, index) => (
                <div key={da.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {da.image_url && (
                    <Image 
                      src={da.image_url} 
                      alt={da.alt_text || da.name}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover"
                      priority={index < 2}
                    />
                  )}
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-2">{da.name}</h4>
                    <p className="text-slate-600 mb-4">{da.price_credits} crédits</p>
                    <Link 
                      href={`/da/${da.page_slug || da.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Voir les détails →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">311</div>
              <div className="text-slate-600">Directions artistiques</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</div>
              <div className="text-slate-600">Note client moyenne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">24h</div>
              <div className="text-slate-600">Livraison express</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
