import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Types pour les tables principales
export interface DesignAesthetic {
  id: string
  name: string
  description: string
  prompt_used: string
  image_url: string
  google_drive_url?: string
  price_credits: number
  type: string
  product: string[]
  active: boolean
  ai_generated: boolean
  
  // Nouveaux champs SEO
  alt_text?: string
  title_tag?: string
  meta_description?: string
  seo_keywords?: string[]
  page_slug?: string
  seo_updated_at?: string
}

// Client-side Supabase (pour composants client)
export const createClientSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server-side Supabase (pour Server Components et API routes)
export const createServerSupabase = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - can't set cookies
          }
        },
      },
    }
  )
}

// Service Role client (pour opérations admin/serveur)
export const createServiceSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}