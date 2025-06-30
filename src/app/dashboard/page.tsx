'use client'

import { useState, useEffect } from 'react'
import { createClientSupabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'
import DashboardHeader from './components/DashboardHeader'
import DashboardStats from './components/DashboardStats'
import DashboardTabs from './components/DashboardTabs'
import OverviewTab from './components/tabs/OverviewTab'
import FeedbackTab from './components/tabs/FeedbackTab'
import ReferralTab from './components/tabs/ReferralTab'
import PromoCodesTab from './components/tabs/PromoCodesTab'
import LibraryTab from './components/tabs/LibraryTab'
import SubscriptionsTab from './components/tabs/SubscriptionsTab'
import InvoicesTab from './components/tabs/InvoicesTab'
import LoadingSpinner from './components/LoadingSpinner'
import { useRouter } from 'next/navigation'

// Types pour les données Dashboard
interface DashboardStats {
  credits: number
  activeOrders: number
  activeReservations: number
  availableDAs: number
}

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

const TABS = [
  { id: 'overview', label: '📊 Vue d\'ensemble', icon: '📊' },
  { id: 'feedback', label: '💌 Feedback', icon: '💌' },
  { id: 'referral', label: '👥 Parrainage', icon: '👥' },
  { id: 'promos', label: '🎁 Codes Promo', icon: '🎁' },
  { id: 'library', label: '📚 Bibliothèque DAs', icon: '📚' },
  { id: 'subscriptions', label: '📊 Abonnements', icon: '📊' },
  { id: 'invoices', label: '📄 Factures', icon: '📄' }
]

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    credits: 0,
    activeOrders: 0,
    activeReservations: 0,
    availableDAs: 0
  })
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClientSupabase()

  // Authentification et chargement initial
  useEffect(() => {
    initializeDashboard()
  }, [])

  const initializeDashboard = async () => {
    try {
      setLoading(true)
      
      // Vérifier l'authentification
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/login?redirect=dashboard')
        return
      }
      
      setUser(user)
      
      // Charger le profil utilisateur
      await loadUserProfile(user.id)
      
      // Charger les statistiques
      await loadDashboardStats(user.id)
      
    } catch (error) {
      console.error('Erreur initialisation dashboard:', error)
      setError('Erreur lors du chargement du dashboard')
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, email, credits, referral_code')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Erreur profil:', error)
        // Créer profil s'il n'existe pas
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({ 
            id: userId, 
            email: user?.email || '', 
            credits: 0,
            referral_code: generateReferralCode() 
          })
          .select()
          .single()
        
        if (createError) throw createError
        setUserProfile(newProfile)
      } else {
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Erreur chargement profil:', error)
    }
  }

  const generateReferralCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    return letters.charAt(Math.floor(Math.random() * letters.length)) +
           letters.charAt(Math.floor(Math.random() * letters.length)) +
           numbers.charAt(Math.floor(Math.random() * numbers.length)) +
           numbers.charAt(Math.floor(Math.random() * numbers.length)) +
           numbers.charAt(Math.floor(Math.random() * numbers.length)) +
           numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  const loadDashboardStats = async (userId: string) => {
    try {
      // Charger statistiques en parallèle
      const [
        creditsResult,
        ordersResult,
        reservationsResult,
        dasResult
      ] = await Promise.all([
        // Crédits depuis le profil
        supabase
          .from('profiles')
          .select('credits')
          .eq('id', userId)
          .single(),
        
        // Commandes actives
        supabase
          .from('orders')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'pending'),
        
        // Réservations actives
        supabase
          .from('reservations')
          .select('id')
          .eq('user_id', userId)
          .eq('status', 'active'),
        
        // DAs disponibles
        supabase
          .from('design_aesthetics')
          .select('id')
          .eq('active', true)
      ])

      setStats({
        credits: creditsResult.data?.credits || 0,
        activeOrders: ordersResult.data?.length || 0,
        activeReservations: reservationsResult.data?.length || 0,
        availableDAs: dasResult.data?.length || 0
      })
      
    } catch (error) {
      console.error('Erreur chargement statistiques:', error)
    }
  }

  const refreshDashboard = async () => {
    if (user) {
      await Promise.all([
        loadUserProfile(user.id),
        loadDashboardStats(user.id)
      ])
    }
  }

  const renderActiveTab = () => {
    if (!user || !userProfile) return null

    const commonProps = {
      user,
      userProfile,
      supabase,
      onRefresh: refreshDashboard
    }

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...commonProps} stats={stats} />
      case 'feedback':
        return <FeedbackTab {...commonProps} />
      case 'referral':
        return <ReferralTab {...commonProps} />
      case 'promos':
        return <PromoCodesTab {...commonProps} />
      case 'library':
        return <LibraryTab {...commonProps} />
      case 'subscriptions':
        return <SubscriptionsTab />
      case 'invoices':
        return <InvoicesTab />
      default:
        return <OverviewTab {...commonProps} stats={stats} />
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (!user || !userProfile) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} userProfile={userProfile} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <DashboardStats stats={stats} />
        
        <DashboardTabs 
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  )
}