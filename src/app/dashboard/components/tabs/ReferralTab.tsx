'use client'

import { useState, useEffect } from 'react'
import { User, SupabaseClient } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

interface ReferralStats {
  totalReferrals: number
  creditsEarned: number
  pendingReferrals: number
}

interface ReferralTabProps {
  user: User
  userProfile: UserProfile
  supabase: SupabaseClient
  onRefresh: () => void
}

export default function ReferralTab({ user, userProfile, supabase, onRefresh }: ReferralTabProps) {
  const [referralCode, setReferralCode] = useState('')
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    creditsEarned: 0,
    pendingReferrals: 0
  })
  const [inputCode, setInputCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error' | 'info', text: string} | null>(null)

  useEffect(() => {
    loadReferralData()
  }, [userProfile])

  const loadReferralData = async () => {
    try {
      // Charger le code de parrainage
      setReferralCode(userProfile.referral_code || '')
      
      // Charger les statistiques
      await loadReferralStats()
      
    } catch (error) {
      console.error('Erreur chargement données parrainage:', error)
    }
  }

  const loadReferralStats = async () => {
    try {
      // Statistiques depuis la table referral_tracking
      const { data: referralData, error } = await supabase
        .from('referral_tracking')
        .select('*')
        .eq('referrer_id', user.id)

      if (error) throw error

      const successfulReferrals = referralData?.filter(r => r.status === 'completed') || []
      const pendingReferrals = referralData?.filter(r => r.status === 'pending') || []

      setStats({
        totalReferrals: successfulReferrals.length,
        creditsEarned: successfulReferrals.length * 1000, // 1000 crédits par parrainage
        pendingReferrals: pendingReferrals.length
      })
      
    } catch (error) {
      console.error('Erreur chargement statistiques parrainage:', error)
      setStats({
        totalReferrals: 0,
        creditsEarned: 0,
        pendingReferrals: 0
      })
    }
  }

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setMessage({type: 'success', text: 'Code copié dans le presse-papier !'})
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({type: 'error', text: 'Erreur lors de la copie'})
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const shareReferralLink = async () => {
    const shareUrl = `https://packshot.art/register?ref=${referralCode}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Rejoignez Packshot.art',
          text: `Utilisez mon code de parrainage ${referralCode} et gagnez 1000 crédits !`,
          url: shareUrl
        })
      } catch (error) {
        // Fallback vers copie
        await copyShareLink(shareUrl)
      }
    } else {
      await copyShareLink(shareUrl)
    }
  }

  const copyShareLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setMessage({type: 'success', text: 'Lien de parrainage copié !'})
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({type: 'error', text: 'Erreur lors de la copie du lien'})
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const validateReferralCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputCode.trim()) {
      setMessage({type: 'error', text: 'Veuillez saisir un code de parrainage'})
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Appeler la fonction RPC pour valider le code
      const { data, error } = await supabase.rpc('apply_referral_code', {
        user_id: user.id,
        referral_code: inputCode.toUpperCase()
      })

      if (error) throw error

      if (data?.success) {
        setMessage({type: 'success', text: 'Code de parrainage validé ! Vous recevrez 1000 crédits lors de votre premier achat.'})
        setInputCode('')
        onRefresh() // Rafraîchir les données
      } else {
        setMessage({type: 'error', text: data?.message || 'Code de parrainage invalide'})
      }
      
    } catch (error: any) {
      console.error('Erreur validation code parrainage:', error)
      setMessage({type: 'error', text: error.message || 'Erreur lors de la validation du code'})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">👥 Système de Parrainage</h2>
        <p className="text-gray-600">Parrainez vos amis et gagnez 1000 crédits chacun</p>
      </div>

      {/* Message d'état */}
      {message && (
        <div className={`
          p-4 rounded-lg border
          ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}
          ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
          ${message.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
        `}>
          {message.text}
        </div>
      )}

      {/* Mon Code de Parrainage */}
      <div className="bg-gradient-to-br from-indigo-500 to-teal-600 text-white p-8 rounded-xl">
        <h3 className="text-xl font-semibold mb-6">🎯 Votre Code de Parrainage</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg">
            <div className="text-sm opacity-90 mb-1">Votre code :</div>
            <div className="text-2xl font-bold tracking-wider">
              {referralCode || 'Chargement...'}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyReferralCode}
              disabled={!referralCode}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              📋 Copier
            </button>
            <button
              onClick={shareReferralLink}
              disabled={!referralCode}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              🔗 Partager
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Utiliser un Code */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">📥 J'ai un Code de Parrainage</h3>
          <p className="text-gray-600 mb-6">Saisissez le code de votre parrain pour gagner 1000 crédits lors de votre premier achat</p>
          
          <form onSubmit={validateReferralCode} className="space-y-4">
            <div>
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Ex: AB1234"
                maxLength={6}
                pattern="[A-Z]{2}[0-9]{4}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-semibold tracking-wider uppercase focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !inputCode.trim()}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⏳ Validation...' : '✅ Valider le Code'}
            </button>
          </form>
        </div>

        {/* Statistiques */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Mes Statistiques</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Parrainages réussis</span>
              <span className="font-semibold text-gray-900">{stats.totalReferrals}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Crédits gagnés</span>
              <span className="font-semibold text-green-600">{stats.creditsEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">En attente</span>
              <span className="font-semibold text-orange-600">{stats.pendingReferrals}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-500">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Comment ça marche ?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '1️⃣', title: 'Partagez votre code', desc: 'Donnez votre code unique à vos amis' },
            { step: '2️⃣', title: 'Ils s\'inscrivent', desc: 'Avec votre code lors de l\'inscription' },
            { step: '3️⃣', title: 'Premier achat', desc: 'Dès leur premier achat de crédits ou abonnement' },
            { step: '🎉', title: '1000 crédits chacun', desc: 'Automatiquement ajoutés à vos comptes' }
          ].map((item, index) => (
            <div key={index}>
              <div className="font-semibold text-indigo-600 mb-2">{item.step} {item.title}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}