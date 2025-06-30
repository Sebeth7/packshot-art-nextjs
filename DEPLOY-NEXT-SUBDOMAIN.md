# 🚀 GUIDE DÉPLOIEMENT NEXT.JS SUR SOUS-DOMAINE

## 🎯 **OBJECTIF**
Déployer le Dashboard Next.js complet sur un sous-domaine (ex: `next.packshot.art`)

---

## 📋 **MÉTHODE 1 : VIA INTERFACE NETLIFY (RECOMMANDÉE)**

### **1. Créer nouveau site Netlify**
1. Aller sur https://app.netlify.com
2. Cliquer "New site from Git"
3. Choisir "GitHub"
4. Sélectionner repository : `Sebeth7/packshot-art-nextjs`
5. **Configuration Build** :
   ```
   Build command: npm run build
   Publish directory: .next
   Node version: 18.x
   ```

### **2. Variables environnement**
Dans Site settings → Environment variables, ajouter :
```
NEXT_PUBLIC_SUPABASE_URL=https://dxwolbmhjqsgznwamuab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4d29sYm1oanFzZ3pud2FtdWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTczNjksImV4cCI6MjA2NDI5MzM2OX0.MfiDkJsm98UG4HBoaQgvQKEMrdNk67Ral1TUxaVh7SU
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4d29sYm1oanFzZ3pud2FtdWFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODcxNzM2OSwiZXhwIjoyMDY0MjkzMzY5fQ.VsR6_1rtMIdKwCMhrSTudKl33m9fFg9MKrPmZHaqrvc
```

### **3. Configurer sous-domaine**
1. Site settings → Domain management
2. "Add custom domain" 
3. Entrer : `next.packshot.art`
4. **DNS chez Infomaniak** :
   ```
   Type: CNAME
   Nom: next
   Valeur: [nom-site-netlify].netlify.app
   ```

---

## 📋 **MÉTHODE 2 : DRAG & DROP**

### **1. Build local**
```bash
cd /Users/photodif/Documents/packshot-art/packshot-art-next
npm run build
```

### **2. Déploiement**
1. Aller sur https://app.netlify.com/drop
2. Drag & drop le dossier `.next`
3. Configurer variables environnement
4. Configurer sous-domaine

---

## ✅ **VALIDATION DÉPLOIEMENT**

### **Pages à tester**
- ✅ **Homepage** : `next.packshot.art/`
- ✅ **Catalogue** : `next.packshot.art/catalogue`
- ✅ **Dashboard** : `next.packshot.art/dashboard`
- ✅ **DAs individuelles** : `next.packshot.art/da/[slug]`

### **Fonctionnalités critiques**
- ✅ **Authentification Supabase** : Login/logout
- ✅ **Dashboard modules** : 7 onglets fonctionnels
- ✅ **Catalogue filtres** : 311 DAs affichées
- ✅ **Performance** : Lighthouse 90+

---

## 🔧 **FICHIERS CONFIGURATION**

### **netlify.toml** (déjà configuré)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### **Variables .env.local** (locales)
```bash
# Déjà configurées dans /Users/photodif/Documents/packshot-art/packshot-art-next/.env.local
```

---

## 🎯 **RÉSULTAT ATTENDU**

### **Architecture finale**
```
PRODUCTION STABLE    : https://packshot.art (site HTML complet)
DÉVELOPPEMENT NEXT.JS: https://next.packshot.art (site Next.js partiel)
```

### **Contenu Next.js déployé**
- ✅ **Homepage Next.js** : Modern, responsive, optimisée
- ✅ **Catalogue complet** : 311 DAs avec filtres
- ✅ **Dashboard 7 modules** : Bugs parrainage/codes promo résolus
- ✅ **Pages DAs** : 311 pages individuelles SEO

### **Prêt pour** 
- Tests utilisateur Dashboard sans bugs
- Workflow harmonisation HTML → Next.js
- Migration progressive pages manquantes

---

🎯 **Site Next.js prêt pour validation et développement futur !**