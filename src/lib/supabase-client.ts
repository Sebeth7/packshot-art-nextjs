import { createClient } from '@supabase/supabase-js'

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