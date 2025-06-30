import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour les images externes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dxwolbmhjqsgznwamuab.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'img.recraft.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuration pour les redirections SEO
  async redirects() {
    return [
      {
        source: '/catalogue-v2.html',
        destination: '/catalogue',
        permanent: true,
      },
    ]
  },

  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Configuration TypeScript stricte
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Compression et optimisations
  compress: true,
  poweredByHeader: false,

  // Configuration expérimentale pour performance
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
};

export default nextConfig;
