'use client'

import { useState, useEffect } from 'react'
import { User, SupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

interface DashboardStats {
  credits: number
  activeOrders: number
  activeReservations: number
  availableDAs: number
}

interface Order {
  id: string
  status: string
  created_at: string
  total_amount: number
  items_count: number
}

interface Reservation {
  id: string
  da_name: string
  expires_at: string
  status: string
}

interface OverviewTabProps {
  user: User
  userProfile: UserProfile
  supabase: SupabaseClient
  stats: DashboardStats
  onRefresh: () => void
}

export default function OverviewTab({ user, userProfile, supabase, stats, onRefresh }: OverviewTabProps) {
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadOverviewData()
  }, [user])

  const loadOverviewData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadRecentOrders(),
        loadActiveReservations()
      ])
    } catch (error) {
      console.error('Erreur chargement données vue d\'ensemble:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadRecentOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, created_at, total_amount, items_count')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setRecentOrders(data || [])
    } catch (error) {
      console.error('Erreur chargement commandes:', error)
      setRecentOrders([])
    }
  }

  const loadActiveReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(`
          id,
          expires_at,
          status,
          design_aesthetics (name)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('expires_at', { ascending: true })

      if (error) throw error
      
      const formattedReservations = data?.map((res: any) => ({
        id: res.id,
        da_name: res.design_aesthetics?.name || 'DA inconnue',
        expires_at: res.expires_at,
        status: res.status
      })) || []

      setActiveReservations(formattedReservations)
    } catch (error) {
      console.error('Erreur chargement réservations:', error)
      setActiveReservations([])
    }
  }

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getOrderStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminée'
      case 'pending': return 'En attente'
      case 'processing': return 'En cours'
      case 'cancelled': return 'Annulée'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getTimeLeft = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()
    
    if (diff <= 0) return 'Expirée'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) {
      return `${hours}h ${minutes}min restantes`
    }
    return `${minutes}min restantes`
  }

  return (
    <div className="space-y-8">
      {/* Actions Rapides */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/catalogue"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">🎨</div>
            <div className="font-semibold text-gray-900 mb-2">Parcourir le Catalogue</div>
            <div className="text-sm text-gray-600">Découvrir les directions artistiques</div>
          </Link>
          
          <Link
            href="/acheter-credits"
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">💳</div>
            <div className="font-semibold text-gray-900 mb-2">Acheter des Crédits</div>
            <div className="text-sm text-gray-600">Recharger votre solde</div>
          </Link>
          
          <button
            onClick={onRefresh}
            className="block w-full p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-3">🔄</div>
            <div className="font-semibold text-gray-900 mb-2">Actualiser</div>
            <div className="text-sm text-gray-600">Rafraîchir les données</div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Réservations Actives */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">🔒 Réservations Actives</h3>
              <button
                onClick={loadActiveReservations}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Actualiser →
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Chargement...</p>
              </div>
            ) : activeReservations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-3 opacity-50">🔒</div>
                <p className="text-gray-600">Aucune réservation active</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{reservation.da_name}</div>
                      <div className="text-sm text-gray-600">
                        {getTimeLeft(reservation.expires_at)}
                      </div>
                    </div>
                    <div className="text-xl">⏱️</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Commandes Récentes */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">📦 Mes Commandes</h3>
              <button
                onClick={loadRecentOrders}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Actualiser →
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-gray-600">Chargement...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-3 opacity-50">📦</div>
                <p className="text-gray-600">Aucune commande</p>
                <Link
                  href="/catalogue"
                  className="inline-block mt-3 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Passer votre première commande →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          Commande #{order.id.slice(-6)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.items_count} article{order.items_count > 1 ? 's' : ''} • {formatDate(order.created_at)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {order.total_amount?.toLocaleString()} crédits
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}