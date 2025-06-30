'use client'

import { useState } from 'react'
import { User, SupabaseClient } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  credits: number
  referral_code: string
}

interface FeedbackTabProps {
  user: User
  userProfile: UserProfile
  supabase: SupabaseClient
  onRefresh: () => void
}

export default function FeedbackTab({ user, userProfile, supabase }: FeedbackTabProps) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{type: 'success' | 'error' | 'info', text: string} | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) {
      setStatus({type: 'error', text: 'Veuillez saisir votre message'})
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      // Sauvegarder le feedback en base
      const { error } = await supabase
        .from('user_feedback')
        .insert({
          user_id: user.id,
          message: message.trim(),
          user_email: user.email
        })

      if (error) throw error

      setStatus({type: 'success', text: 'Merci pour votre feedback ! Nous l\'avons bien reçu.'})
      setMessage('')
      
    } catch (error) {
      console.error('Erreur envoi feedback:', error)
      setStatus({type: 'error', text: 'Erreur lors de l\'envoi. Veuillez réessayer.'})
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">💌 Suggestions & Feedback</h2>
          <p className="text-gray-600">Partagez vos idées pour améliorer Packshot.art</p>
        </div>

        {/* Message d'état */}
        {status && (
          <div className={`
            mb-6 p-4 rounded-lg border
            ${status.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : ''}
            ${status.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : ''}
            ${status.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' : ''}
          `}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="feedback-message" className="block font-semibold mb-2 text-gray-900">
              Votre message
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical"
              placeholder="Décrivez votre suggestion, problème rencontré, ou toute idée d'amélioration..."
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⏳ Envoi...' : '✉️ Envoyer Feedback'}
            </button>
            <div className="text-sm text-gray-500">
              {message.length}/2000 caractères
            </div>
          </div>
        </form>

        <div className="mt-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
          <h3 className="font-semibold text-indigo-900 mb-2">💡 Idées bienvenues</h3>
          <p className="text-indigo-700 text-sm">
            Nouvelles fonctionnalités, améliorations UX, suggestions de DA, problèmes techniques... 
            Tous vos retours nous aident à améliorer l'expérience !
          </p>
        </div>
      </div>
    </div>
  )
}