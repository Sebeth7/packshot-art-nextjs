# 🎨 DESIGN SYSTEM PACKSHOT.ART - NEXT.JS
*Document évolutif - Mis à jour au fur et à mesure des harmonisations*

## 📊 **ANALYSE COMPARATIVE HOMEPAGE**

### **HTML ACTUEL** (index.html)
- **Design System complet** : Variables CSS premium, palette sophistiquée
- **9 sections** : Hero avec slider, concept, catalogue, process, FAQ...
- **Animations avancées** : Before/after slider, hover effects, scroll animations
- **Typographie premium** : Crimson Text + Inter, hiérarchie complexe
- **Navigation glassmorphism** : Backdrop blur, fixe au scroll

### **NEXT.JS ACTUEL** (page.tsx)
- **Design basique** : Tailwind standard, palette simple
- **3 sections** : Header, hero, DAs preview, stats
- **Pas d'animations** : Transitions simples
- **Typographie basique** : Police système
- **Navigation simple** : Header statique

## 🎯 **FONDATIONS DESIGN SYSTEM**

### **1. Variables CSS Globales**
```css
:root {
  /* Palette Premium */
  --primary: #1E293B;
  --primary-dark: #0F172A;
  --accent: #6366F1;
  --accent-dark: #4F46E5;
  --accent-light: #818CF8;
  --secondary: #10B981;
  --teal: #14B8A6;
  --amber: #F59E0B;
  
  /* Gris sophistiqué */
  --gris-chaud-100: #F8FAFC;
  --gris-chaud-200: #F1F5F9;
  --gris-chaud-700: #475569;
  --gris-chaud-900: #1E293B;
  
  /* Typographie */
  --font-heading: 'Crimson Text', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Espacements */
  --radius: 16px;
  --radius-sm: 10px;
  --radius-lg: 24px;
  --space: 1.2rem;
  
  /* Animations */
  --transition-premium: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-rapide: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Shadows */
  --shadow-subtile: 0 4px 20px rgba(0,0,0,0.05);
  --shadow-hover: 0 8px 30px rgba(0,0,0,0.08);
  --shadow-premium: 0 12px 40px rgba(0,0,0,0.10);
}
```

### **2. Typographie System**
```tsx
// Configuration Next.js fonts
import { Crimson_Text, Inter } from 'next/font/google'

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-heading'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body'
})
```

## 🏗️ **COMPOSANTS SYSTÈME**

### **Navigation (Homepage)**
```tsx
<NavigationGlassmorphism>
  - Logo Packshot.art
  - Menu centre (5 liens)
  - Actions droite (panier + auth)
  - Mobile hamburger
  - Backdrop blur effect
  - Scroll detection
</NavigationGlassmorphism>
```

### **Hero Section (Homepage)**
```tsx
<HeroWithSlider>
  - Titre H1 responsive (clamp)
  - Sous-titre descriptif
  - CTA button animé
  - Before/After slider interactif
  - 3 packshots overlay positionnés
</HeroWithSlider>
```

### **Buttons System**
```css
.btn-premium {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
  padding: 0.6rem 1.8rem;
  border-radius: var(--radius-sm);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  transition: var(--transition-rapide);
}

.btn-premium:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}
```

## 🎭 **ANIMATIONS STANDARDS**

### **Glassmorphism Navigation**
```css
.navigation-scrolled {
  backdrop-filter: blur(24px);
  background: rgba(248, 250, 252, 0.8);
  box-shadow: var(--shadow-subtile);
}
```

### **Scroll Fade-in**
```tsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible')
      }
    })
  })
}, [])
```

## 📱 **RESPONSIVE RULES**

### **Breakpoints Standard**
- Mobile : `< 768px`
- Tablet : `768px - 1024px`
- Desktop : `> 1024px`

### **Typographie Responsive**
```css
/* Titres adaptatifs */
h1 { font-size: clamp(3rem, 6vw, 4.5rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
```

---

## 📋 **PLAN HARMONISATION PROGRESSIVE**

### **✅ HOMEPAGE (En cours)**
1. Mise à jour globals.css avec variables
2. Configuration fonts premium
3. Navigation glassmorphism
4. Hero avec slider before/after
5. 9 sections harmonisées

### **🔄 CATALOGUE (Prochain)**
*Sections à documenter après harmonisation :*
- Filtres avancés (tabs system)
- Grid DAs responsive
- Cards avec hover effects
- Pagination/infinite scroll

### **🔄 DASHBOARD (Futur)**
*Composants à ajouter :*
- Système d'onglets
- Formulaires complexes
- Tables de données
- Status badges

### **🔄 PAGES ADMIN/PANIER/LOGIN (À venir)**
*Patterns à extraire :*
- Modals/overlays
- Formulaires auth
- E-commerce components
- Admin interfaces

---

## 📋 **ÉTAT SESSION 2025-06-30**

### **✅ ACCOMPLISSEMENTS**
- **Design System** : Foundation CSS variables + fonts premium installées
- **Navigation Component** : Glassmorphism avec scroll detection fonctionnel
- **Hero Component** : Slider before/after avec vraies images
- **Sections partielles** : Concept, Process, FAQ ajoutées

### **⚠️ CORRECTIONS NÉCESSAIRES PROCHAINE SESSION**
#### **Contenu pas fidèle à l'original**
- **Textes inventés** au lieu de copie exacte d'index.html
- **Sections incomplètes** par rapport à version HTML
- **Structure simplifiée** vs complexité originale

#### **Sections manquantes à ajouter** :
1. **Why Section** : 3 avantages exacts (72h chrono, Direction artistique premium, Qualité garantie)
2. **Industries Section** : Joaillerie, Lunetterie, Horlogerie avec vrais textes
3. **Trust Section** : Logos clients + statistiques exactes
4. **Advantages Section** : 6 cartes d'avantages avec texte original
5. **CTA Final** : Appel action avec offre d'essai

#### **Méthode prochaine session** :
1. **Extraction littérale** du contenu HTML (aucune paraphrase)
2. **Reproduction fidèle** structure + textes + interactions
3. **Validation visuelle** côte à côte HTML vs Next.js

---

🎯 **Ce document évoluera avec chaque page harmonisée pour créer un Design System organique complet !**

**LEÇON APPRISE** : Reproduction à l'identique obligatoire, pas d'invention de contenu.