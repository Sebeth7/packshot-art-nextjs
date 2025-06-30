'use client'

import { useState, useEffect } from 'react'
import { User, SupabaseClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

interface PurchasedDA {
  id: string
  da_id: string
  da_name: string
  da_image_url: string
  da_price: number
  purchased_at: string
  page_slug?: string
}

interface LibraryTabProps {
  user: User
  userProfile: UserProfile
  supabase: SupabaseClient
  onRefresh: () => void
}

export default function LibraryTab({ user, userProfile, supabase }: LibraryTabProps) {
  const [purchasedDAs, setPurchasedDAs] = useState<PurchasedDA[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPurchasedDAs()
  }, [user])

  const loadPurchasedDAs = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          id,
          da_id,
          created_at,
          orders!inner (
            user_id,
            status
          ),
          design_aesthetics (
            name,
            image_url,
            price_credits,
            page_slug
          )
        `)
        .eq('orders.user_id', user.id)
        .eq('orders.status', 'completed')
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedDAs = data?.map((item: any) => ({
        id: item.id,
        da_id: item.da_id,
        da_name: item.design_aesthetics?.name || 'DA inconnue',
        da_image_url: item.design_aesthetics?.image_url || '',
        da_price: item.design_aesthetics?.price_credits || 0,
        purchased_at: item.created_at,
        page_slug: item.design_aesthetics?.page_slug
      })) || []

      setPurchasedDAs(formattedDAs)
      
    } catch (error) {
      console.error('Erreur chargement bibliothèque:', error)
      setPurchasedDAs([])
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const calculateDiscountedPrice = (originalPrice: number) => {
    return Math.round(originalPrice * 0.7) // -30% pour re-commande
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de votre bibliothèque...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Vos DAs Achetées</h2>
        <p className="text-gray-600">Consultez vos directions artistiques achetées et re-commandez avec -30%</p>
      </div>

      {purchasedDAs.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-6 opacity-50">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Aucune DA achetée</h3>
          <p className="text-gray-600 mb-6">Découvrez notre catalogue pour commander vos premières directions artistiques</p>
          <Link
            href="/catalogue"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            🎨 Voir le Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedDAs.map((da) => (
            <div
              key={da.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-square relative bg-gray-100">
                {da.da_image_url ? (
                  <Image
                    src={da.da_image_url}
                    alt={da.da_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🎨</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Acheté
                </div>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {da.da_name}
                </h3>
                
                <div className="text-sm text-gray-600 mb-4">
                  Acheté le {formatDate(da.purchased_at)}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="text-gray-500 line-through">
                      {da.da_price.toLocaleString()} crédits
                    </div>
                    <div className="font-semibold text-green-600">
                      {calculateDiscountedPrice(da.da_price).toLocaleString()} crédits (-30%)
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {da.page_slug && (
                      <Link
                        href={`/da/${da.page_slug}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        Voir
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        // Ajouter au panier avec réduction -30%
                        console.log('Re-commander DA:', da.da_id)
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Re-commander
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}