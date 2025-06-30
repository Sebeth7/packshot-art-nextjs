'use client'

import { useState, useEffect } from 'react'
import { User, SupabaseClient } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

interface PromoCode {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed'
  discount_value: number
  used_at: string
  description?: string
}

interface PromoCodesTabProps {
  user: User
  userProfile: UserProfile
  supabase: SupabaseClient
  onRefresh: () => void
}

export default function PromoCodesTab({ user, userProfile, supabase, onRefresh }: PromoCodesTabProps) {
  const [promoCode, setPromoCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'info', text: string} | null>(null)
  const [usedCodes, setUsedCodes] = useState<PromoCode[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    loadPromoHistory()
  }, [user])

  const loadPromoHistory = async () => {
    try {
      setLoadingHistory(true)
      
      const { data, error } = await supabase
        .from('promo_code_usage')
        .select(`
          id,
          code,
          used_at,
          promo_codes (
            discount_type,
            discount_value,
            description
          )
        `)
        .eq('user_id', user.id)
        .order('used_at', { ascending: false })

      if (error) throw error

      const formattedCodes = data?.map((item: any) => ({
        id: item.id,
        code: item.code,
        discount_type: item.promo_codes?.discount_type || 'percentage',
        discount_value: item.promo_codes?.discount_value || 0,
        used_at: item.used_at,
        description: item.promo_codes?.description
      })) || []

      setUsedCodes(formattedCodes)
      
    } catch (error) {
      console.error('Erreur chargement historique codes promo:', error)
      setUsedCodes([])
    } finally {
      setLoadingHistory(false)
    }
  }

  const applyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!promoCode.trim()) {
      setMessage({type: 'error', text: 'Veuillez saisir un code promo'})
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Appeler la fonction RPC pour valider et appliquer le code promo
      const { data, error } = await supabase.rpc('apply_promo_code', {
        user_id: user.id,
        promo_code: promoCode.toUpperCase()
      })

      if (error) throw error

      if (data?.success) {
        const discountText = data.discount_type === 'percentage' 
          ? `${data.discount_value}%`
          : `${data.discount_value} crédits`
        
        setMessage({
          type: 'success', 
          text: `Code promo appliqué avec succès ! Réduction de ${discountText}.`
        })
        setPromoCode('')
        
        // Rafraîchir les données
        await loadPromoHistory()
        onRefresh()
        
      } else {
        setMessage({type: 'error', text: data?.message || 'Code promo invalide ou expiré'})
      }
      
    } catch (error: any) {
      console.error('Erreur application code promo:', error)
      
      if (error.message?.includes('already_used')) {
        setMessage({type: 'error', text: 'Ce code promo a déjà été utilisé'})
      } else if (error.message?.includes('expired')) {
        setMessage({type: 'error', text: 'Ce code promo a expiré'})
      } else if (error.message?.includes('not_found')) {
        setMessage({type: 'error', text: 'Code promo invalide'})
      } else {
        setMessage({type: 'error', text: 'Erreur lors de l\'application du code promo'})
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDiscount = (type: string, value: number) => {
    return type === 'percentage' ? `${value}%` : `${value} crédits`
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎁 Codes Promo</h2>
        <p className="text-gray-600">Utilisez vos codes promo pour bénéficier de réductions</p>
      </div>

      {/* Message d'état */}
      {message && (
        <div className={`
          p-4 rounded-lg border
          ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}
          ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
          ${message.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
        `}>
          <div className="flex items-center">
            <span className="mr-2">
              {message.type === 'success' ? '✅' : message.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            {message.text}
          </div>
        </div>
      )}

      {/* Saisie code promo */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">✨ Utiliser un Code Promo</h3>
        
        <form onSubmit={applyPromoCode} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code Promo
            </label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Entrez votre code promo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold tracking-wider uppercase focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="sm:pt-7">
            <button
              type="submit"
              disabled={loading || !promoCode.trim()}
              className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⏳ Validation...' : 'Valider'}
            </button>
          </div>
        </form>
      </div>

      {/* Historique codes utilisés */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">📊 Mes Codes Utilisés</h3>
        </div>
        
        <div className="p-6">
          {loadingHistory ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-3"></div>
              <p className="text-gray-600">Chargement de l'historique...</p>
            </div>
          ) : usedCodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 opacity-50">🎁</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Aucun code promo utilisé</h4>
              <p className="text-gray-600">Utilisez votre premier code promo ci-dessus pour commencer à économiser !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {usedCodes.map((code) => (
                <div
                  key={code.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-gray-900 tracking-wider">
                        {code.code}
                      </span>
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${code.discount_type === 'percentage' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                        }
                      `}>
                        -{formatDiscount(code.discount_type, code.discount_value)}
                      </span>
                    </div>
                    {code.description && (
                      <p className="text-sm text-gray-600 mb-1">{code.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Utilisé le {formatDate(code.used_at)}
                    </p>
                  </div>
                  <div className="text-2xl opacity-60">✅</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400">
        <h4 className="font-semibold text-amber-800 mb-2">💡 Conseils</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Les codes promo sont à usage unique</li>
          <li>• Vérifiez la date d'expiration avant utilisation</li>
          <li>• Certains codes peuvent avoir des conditions spécifiques</li>
          <li>• Suivez nos réseaux sociaux pour des codes exclusifs</li>
        </ul>
      </div>
    </div>
  )
}