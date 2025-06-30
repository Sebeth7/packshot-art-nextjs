import { createServerSupabase } from '@/lib/supabase'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'Retouche Photo Produit IA + Expertise Manuelle | Packshot.art France',
  description: 'Transformez vos packshots avec notre process unique : IA de pointe + retouches manuelles expertes. 500+ directions artistiques renouvelées chaque mois. Devis gratuit.',
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

      {/* Offre d'essai Banner */}
      <section className="py-6 px-6" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium" style={{ color: 'var(--blanc-pur)' }}>
            🎁 1 photo premium ou 3 photos e-commerce offertes pour tester notre solution
          </p>
        </div>
      </section>

      {/* Solution Hybride Section - DESIGN EXACT */}
      <section className="py-24 px-6" id="solution-hybride" style={{ background: 'var(--blanc-premium)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-heading)', 
            color: 'var(--primary)' 
          }}>
            Toute votre communication visuelle à partir d'un seul packshot
          </h2>
          <p className="text-xl mb-12 max-w-4xl mx-auto" style={{ 
            color: 'var(--gris-chaud-600)',
            lineHeight: '1.6'
          }}>
            Plus besoin de shootings complexes, de modèles ou de studios : nous transformons votre packshot de qualité 
            en campagne visuelle complète. E-commerce, produit porté, mises en situation éditoriales — 
            tout est généré grâce à notre alliance unique entre IA créative et retouches expertes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--accent)', color: 'var(--blanc-pur)' }}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Aucun shooting requis
              </h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--secondary)', color: 'var(--blanc-pur)' }}>
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                500+ directions artistiques
              </h3>
              <p className="text-sm" style={{ color: 'var(--gris-chaud-600)' }}>
                renouvelées chaque mois
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--amber)', color: 'var(--blanc-pur)' }}>
                <span className="text-2xl">✋</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Retouches manuelles expertes
              </h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                   style={{ background: 'var(--teal)', color: 'var(--blanc-pur)' }}>
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                2 à 3 reviews possibles
              </h3>
              <p className="text-sm" style={{ color: 'var(--gris-chaud-600)' }}>
                pour le meilleur résultat
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
              500+ directions artistiques
            </h3>
            <p className="text-xl text-center mb-12" style={{ color: 'var(--gris-chaud-600)' }}>
              Chaque style est pensé pour valoriser vos produits et augmenter vos ventes
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

      {/* Process Section */}
      <section className="py-20 px-6" id="process">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Un process simple, des résultats exceptionnels
            </h2>
            <p className="text-xl" style={{ color: 'var(--gris-chaud-600)' }}>
              De la sélection à la livraison, un workflow optimisé
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold" 
                   style={{ 
                     background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)',
                     color: 'var(--blanc-pur)'
                   }}>
                01
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Sélection DA
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Choisissez parmi nos 500+ directions artistiques exclusives, renouvelées chaque mois
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold" 
                   style={{ 
                     background: 'linear-gradient(135deg, var(--secondary) 0%, var(--teal) 100%)',
                     color: 'var(--blanc-pur)'
                   }}>
                02
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Upload packshots
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Envoyez vos photos produits via notre interface sécurisée
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold" 
                   style={{ 
                     background: 'linear-gradient(135deg, var(--amber) 0%, var(--amber-light) 100%)',
                     color: 'var(--blanc-pur)'
                   }}>
                03
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Assemblage
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                nos retoucheurs montent vos packshots sur les directions artistiques choisies
              </p>
            </div>

            {/* Étape 4 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold" 
                   style={{ 
                     background: 'linear-gradient(135deg, var(--teal) 0%, var(--secondary) 100%)',
                     color: 'var(--blanc-pur)'
                   }}>
                04
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Livraison
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Photos contractuelles livrées en 48-72h, prêtes pour vos campagnes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Premium */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--accent)',
                fontFamily: 'var(--font-heading)' 
              }}>
                500+
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

      {/* Why Section - 3 avantages */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Avantage 1 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                     border: '1px solid rgba(99, 102, 241, 0.2)'
                   }}>
                ⚡
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ 
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)' 
              }}>
                72h chrono
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)', lineHeight: '1.8' }}>
                Vos visuels livrés en 72h max, prêts pour vos campagnes. Fini les semaines d'attente des studios traditionnels.
              </p>
            </div>

            {/* Avantage 2 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                     border: '1px solid rgba(99, 102, 241, 0.2)'
                   }}>
                🎯
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ 
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)' 
              }}>
                Direction artistique premium
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)', lineHeight: '1.8' }}>
                20 ans d'expérience en photo de mode et produit. Chaque visuel est pensé pour convertir.
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-3xl" 
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)',
                     border: '1px solid rgba(99, 102, 241, 0.2)'
                   }}>
                💎
              </div>
              <h3 className="text-2xl font-semibold mb-4" style={{ 
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)' 
              }}>
                Qualité garantie
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)', lineHeight: '1.8' }}>
                Qualité studio professionnelle. Représentation exacte de vos produits - aucune approximation IA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-6" style={{ background: 'var(--gris-chaud-100)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Des solutions adaptées à chaque industrie
            </h2>
            <p className="text-xl" style={{ color: 'var(--gris-chaud-600)' }}>
              Expertise sectorielle et directions artistiques sur-mesure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Joaillerie */}
            <div className="text-center p-8" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Joaillerie
              </h3>
              <p className="mb-4" style={{ color: 'var(--gris-chaud-600)' }}>
                Mettez en lumière l'éclat et les détails de vos créations
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Luxe</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Macro</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Minimaliste</span>
              </div>
            </div>

            {/* Lunetterie */}
            <div className="text-center p-8" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-4xl mb-4">🕶️</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Lunetterie
              </h3>
              <p className="mb-4" style={{ color: 'var(--gris-chaud-600)' }}>
                Directions artistiques fashion qui valorisent vos collections
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Editorial</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Street</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Lifestyle</span>
              </div>
            </div>

            {/* Horlogerie */}
            <div className="text-center p-8" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-4xl mb-4">⌚</div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Horlogerie
              </h3>
              <p className="mb-4" style={{ color: 'var(--gris-chaud-600)' }}>
                Valorisez la précision et l'élégance de vos montres avec des visuels sophistiqués
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Luxe</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Précision</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ 
                  background: 'var(--gris-chaud-100)', 
                  color: 'var(--gris-chaud-600)' 
                }}>Raffinement</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="/catalogue" className="btn-premium">
              Découvrir toutes nos DA par industrie
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Ils nous font confiance
            </h2>
            <p className="text-xl" style={{ color: 'var(--gris-chaud-600)' }}>
              De la startup au grand groupe, ils ont transformé leurs visuels avec nous
            </p>
          </div>
          
          {/* Logos clients */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center mb-16 opacity-60">
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>Lancel</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>Integra</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>FOB Paris</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>Klokers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>McLaren</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg" style={{ color: 'var(--gris-chaud-600)' }}>Demetz</div>
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--accent)',
                fontFamily: 'var(--font-heading)' 
              }}>
                98%
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                Clients satisfaits
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--secondary)',
                fontFamily: 'var(--font-heading)' 
              }}>
                72h
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                Délai moyen
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2" style={{ 
                color: 'var(--amber)',
                fontFamily: 'var(--font-heading)' 
              }}>
                -75%
              </div>
              <div style={{ color: 'var(--gris-chaud-600)' }}>
                vs shooting traditionnel
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section - 6 cartes */}
      <section className="py-20 px-6" style={{ background: 'var(--gris-chaud-100)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Pourquoi choisir notre solution ?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Avantage 1 */}
            <div className="p-6 text-center" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                500+ DA exclusives
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Catalogue renouvelé chaque mois, possibilité d'exclusivité pour votre marque
              </p>
            </div>

            {/* Avantage 2 - Highlight */}
            <div className="p-6 text-center relative" style={{ 
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-premium)',
              color: 'var(--blanc-pur)'
            }}>
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold mb-3">
                Jusqu'à -75% d'économies
              </h3>
              <p>
                Par rapport à une production photo traditionnelle, sans compromis sur la qualité
              </p>
            </div>

            {/* Avantage 3 */}
            <div className="p-6 text-center" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Livraison ultra-rapide
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                48-72h pour des visuels prêts à l'emploi sur tous vos supports
              </p>
            </div>

            {/* Avantage 4 */}
            <div className="p-6 text-center" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Sur-mesure possible
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Adaptation fine à vos besoins spécifiques et votre identité de marque
              </p>
            </div>

            {/* Avantage 5 */}
            <div className="p-6 text-center" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-3xl mb-4">📸</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Séries cohérentes
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Parfait pour présenter vos collections avec une identité visuelle forte
              </p>
            </div>

            {/* Avantage 6 */}
            <div className="p-6 text-center" style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                Photos contractuelles
              </h3>
              <p style={{ color: 'var(--gris-chaud-600)' }}>
                Qualité garantie, zéro retour client dû aux visuels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6" id="faq" style={{ background: 'var(--gris-chaud-100)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ 
              fontFamily: 'var(--font-heading)', 
              color: 'var(--primary)' 
            }}>
              Questions fréquentes
            </h2>
            <p className="text-xl" style={{ color: 'var(--gris-chaud-600)' }}>
              Tout ce que vous devez savoir sur notre service
            </p>
          </div>
          
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  Les photos sont-elles vraiment indistinguables d'un vrai shooting ?
                </h3>
                <p style={{ color: 'var(--gris-chaud-600)' }}>
                  Oui ! Notre combinaison IA + retouches manuelles expertes produit des visuels de qualité studio. 
                  Absolument. Notre process hybride combine IA de pointe et retouches manuelles par des experts avec 20 ans d'expérience. Le résultat : des photos d'une qualité professionnelle identique à un shooting traditionnel.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  Comment fonctionne exactement le processus ?
                </h3>
                <p style={{ color: 'var(--gris-chaud-600)' }}>
                  1. Vous choisissez une direction artistique - 2. Vous uploadez vos packshots - 3. Nous générons une première ébauche test pour validation client - 4. Nos experts peaufinent manuellement - 5. Vous recevez vos visuels en 48-72h
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  Puis-je tester plusieurs directions artistiques ?
                </h3>
                <p style={{ color: 'var(--gris-chaud-600)' }}>
                  Bien sûr ! C'est l'un de nos avantages majeurs. Vous pouvez facilement tester plusieurs styles pour voir ce qui convertit le mieux, sans refaire une séance photo complète.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  Quels types de produits acceptez-vous ?
                </h3>
                <p style={{ color: 'var(--gris-chaud-600)' }}>
                  Tous les types de produits sont transformables. Nous concentrons notre activité sur la joaillerie, lunetterie, horlogerie et maroquinerie. Si vous avez d'autres produits contactez-nous.
                </p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div style={{ 
              background: 'var(--blanc-pur)', 
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-subtile)'
            }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                  Les droits d'utilisation sont-ils inclus ?
                </h3>
                <p style={{ color: 'var(--gris-chaud-600)' }}>
                  Oui, pour les DA 'e-commerce' et 'premium', vous obtenez les droits d'utilisation commerciale complets et illimités. Pour les DA 'Editorial' également, PLV inclue, avec une particularité pour des utilisations publicitaires print. Si vous êtes concerné.e contactez nous pour en discuter.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/catalogue" className="btn-premium">
              Découvrir nos directions artistiques
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge offre */}
          <div className="inline-block mb-6 px-6 py-3 rounded-full" style={{ 
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)',
            color: 'var(--blanc-pur)',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            🎁 1 photo premium ou 3 photos e-commerce offertes pour tester notre solution
          </div>
          
          <h2 className="text-5xl font-bold mb-6" style={{ 
            fontFamily: 'var(--font-heading)', 
            color: 'var(--primary)' 
          }}>
            Prêt.e à transformer vos packshots ?
          </h2>
          
          <p className="text-xl mb-12" style={{ color: 'var(--gris-chaud-600)' }}>
            Rejoignez les marques qui ont déjà boosté leurs ventes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="/catalogue" className="btn-premium text-lg px-8 py-4">
              Découvrir le catalogue →
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm" style={{ color: 'var(--gris-chaud-600)' }}>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Livraison 72h maximum</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Sans engagement</span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--gris-chaud-200)' }}>
            <p className="text-lg mb-4" style={{ color: 'var(--gris-chaud-600)' }}>
              💬 Besoin d'aide ou d'informations ?
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 font-medium" style={{ color: 'var(--accent)' }}>
              Contactez notre équipe
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M7 10h6m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
