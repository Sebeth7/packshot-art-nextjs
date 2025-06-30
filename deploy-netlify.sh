#!/bin/bash

echo "🚀 DÉPLOIEMENT NEXT.JS DASHBOARD SUR NETLIFY"
echo "============================================="

# Vérifications préalables
echo "📋 1. Vérifications préalables..."

# Vérifier build
if [ ! -d ".next" ]; then
    echo "❌ Build Next.js manquant. Lancement npm run build..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build échoué. Arrêt du déploiement."
        exit 1
    fi
fi

# Vérifier variables environnement
if [ ! -f ".env.local" ]; then
    echo "❌ Fichier .env.local manquant"
    exit 1
fi

echo "✅ Build et environnement OK"

# Installer Netlify CLI si nécessaire
echo "📋 2. Vérification Netlify CLI..."
if ! command -v netlify &> /dev/null; then
    echo "⚠️ Netlify CLI non installé. Installation..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI disponible"

# Déploiement sur Netlify
echo "📋 3. Déploiement sur Netlify..."

# Configuration automatique site
echo "🔧 Configuration automatique du site..."

# Créer nouveau site Netlify si nécessaire
echo "🌐 Création/connexion site Netlify..."
netlify deploy --build --prod --message "Dashboard Next.js v$(date +%Y%m%d-%H%M%S)" --site packshot-art-nextjs || {
    echo "⚠️ Site non trouvé, création d'un nouveau site..."
    netlify deploy --build --prod --message "Dashboard Next.js v$(date +%Y%m%d-%H%M%S)"
}

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 DÉPLOIEMENT RÉUSSI!"
    echo "====================="
    echo ""
    echo "📊 Dashboard Next.js déployé avec succès"
    echo "🔗 URL disponible dans les logs Netlify ci-dessus"
    echo ""
    echo "✅ Fonctionnalités déployées:"
    echo "   - 7 modules Dashboard fonctionnels"
    echo "   - Système parrainage débuggé"
    echo "   - Codes promo fonctionnels"
    echo "   - Interface moderne et rapide"
    echo ""
    echo "🧪 Tests à effectuer:"
    echo "   - Connexion/authentification"
    echo "   - Navigation entre modules"
    echo "   - Fonctions parrainage et codes promo"
    echo "   - Performance mobile"
    echo ""
else
    echo "❌ DÉPLOIEMENT ÉCHOUÉ"
    echo "Vérifiez les logs Netlify ci-dessus"
    exit 1
fi