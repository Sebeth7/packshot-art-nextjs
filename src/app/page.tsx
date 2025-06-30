import { createServerSupabase } from '@/lib/supabase'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Retouche Photo Produit IA + Expertise Manuelle | Packshot.art France',
  description: 'Transformez vos packshots avec notre process unique : IA de pointe + retouches manuelles expertes. 100+ directions artistiques renouvelées chaque mois. Devis gratuit.',
}

// Homepage harmonisée avec design HTML
export default async function HomePage() {
  const supabase = await createServerSupabase()
  
  // Récupérer quelques DAs pour preview
  const { data: featuredDAs, error } = await supabase
    .from('design_aesthetics')
    .select('id, name, alt_text, image_url, page_slug, price_credits')
    .eq('active', true)
    .limit(6)

  if (error) {
    console.error('Error fetching DAs:', error)
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--blanc-premium)' }}>
      {/* Navigation harmonisée */}
      <Navigation />

      {/* Hero Section avec slider */}
      <HeroSection />

      {/* Concept Section */}
      <section className="py-20 px-6" id="solution-hybride">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ 
            fontFamily: 'var(--font-heading)', 
            color: 'var(--primary)' 
          }}>
            Solution hybride unique
          </h2>
          <p className="text-xl mb-12" style={{ color: 'var(--gris-chaud-600)' }}>
            IA de pointe + expertise manuelle pour des résultats exceptionnels
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl" style={{ background: 'var(--blanc-pur)', boxShadow: 'var(--shadow-subtile)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--accent)' }}>
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                IA Générative
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Algorithmes avancés pour transformer vos packshots automatiquement
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ background: 'var(--blanc-pur)', boxShadow: 'var(--shadow-subtile)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--secondary)' }}>
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Retouche Experte
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Finitions manuelles par nos directeurs artistiques professionnels
              </p>
            </div>
            
            <div className="p-6 rounded-2xl" style={{ background: 'var(--blanc-pur)', boxShadow: 'var(--shadow-subtile)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--teal)' }}>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Livraison 72h
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Process optimisé pour une livraison ultra-rapide de qualité premium
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured DAs Preview */}
      {featuredDAs && featuredDAs.length > 0 && (
        <section className="py-20 px-6" style={{ background: 'var(--gris-chaud-100)' }}>
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Directions Artistiques Premium
            </h3>
            <p className="text-xl text-center mb-12" style={{ color: 'var(--gris-chaud-600)' }}>
              311 styles professionnels pour tous vos besoins e-commerce
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDAs.slice(0, 3).map((da, index) => (
                <div key={da.id} className="group overflow-hidden" 
                     style={{ 
                       background: 'var(--blanc-pur)', 
                       borderRadius: 'var(--radius)',
                       boxShadow: 'var(--shadow-subtile)',
                       transition: 'var(--transition-rapide)'
                     }}>
                  {da.image_url && (
                    <div className="relative overflow-hidden" style={{ height: '256px' }}>
                      <img 
                        src={da.image_url} 
                        alt={da.alt_text || da.name}
                        className="w-full h-full object-cover"
                        style={{ transition: 'var(--transition-premium)' }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--primary)' }}>
                      {da.name}
                    </h4>
                    <p className="mb-4" style={{ color: 'var(--gris-chaud-600)' }}>
                      {da.price_credits} crédits
                    </p>
                    <a href={`/da/${da.page_slug || da.id}`}
                       className="inline-flex items-center gap-2 font-medium"
                       style={{ color: 'var(--accent)' }}>
                      Voir les détails
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a href="/catalogue" className="btn-premium">
                Explorer le catalogue complet
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Stats Premium */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--accent)',
                fontFamily: 'var(--font-heading)' 
              }}>
                311
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                Directions artistiques
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--secondary)',
                fontFamily: 'var(--font-heading)' 
              }}>
                4.9/5
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                Note client moyenne
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--amber)',
                fontFamily: 'var(--font-heading)' 
              }}>
                72h
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                Livraison express
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
