# APEX - Site Web 3D Interactif

## 🚀 Description

APEX est un site web 3D moderne et interactif pour une marque de chaussures de sport concurrente de Nike. Le site présente une expérience utilisateur immersive avec des éléments 3D, des animations fluides et un design responsive.

## ✨ Fonctionnalités

### 🎨 Design & Interface
- **Design moderne et futuriste** avec une palette de couleurs orange/noir
- **Interface responsive** optimisée pour tous les appareils
- **Navigation fluide** avec scroll smooth et effets de parallaxe
- **Typographie moderne** avec la police Inter

### 🌟 Éléments 3D Interactifs
- **Scène 3D héro** avec chaussure interactive et particules flottantes
- **Vitrine produits 3D** avec rotation automatique et effets hover
- **Visualisation technologique** avec animations orbitales
- **Interactions souris** pour rotation des objets 3D

### 🎬 Animations
- **Animations GSAP** pour les transitions fluides
- **ScrollTrigger** pour les animations au scroll
- **Effets de parallaxe** sur les éléments géométriques
- **Compteurs animés** pour les statistiques
- **Micro-interactions** sur les boutons et cartes

### 📱 Responsive Design
- **Mobile-first** avec menu hamburger
- **Grilles adaptatives** pour tous les écrans
- **Optimisations tactiles** pour mobile/tablette

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Grid/Flexbox
- **JavaScript ES6+** - Logique interactive
- **Three.js** - Rendu 3D et WebGL
- **GSAP** - Animations haute performance
- **ScrollTrigger** - Animations au scroll

## 📁 Structure du Projet

```
apex-website/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript et 3D
└── README.md           # Documentation
```

## 🚀 Installation & Lancement

1. **Cloner ou télécharger** les fichiers du projet
2. **Ouvrir** `index.html` dans un navigateur moderne
3. **Profiter** de l'expérience 3D interactive !

### Serveur Local (Recommandé)

Pour une meilleure performance, utilisez un serveur local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000`

## 🎯 Sections du Site

### 1. **Hero Section**
- Animation 3D de chaussure interactive
- Particules flottantes animées
- Call-to-action avec boutons stylisés

### 2. **Collection Produits**
- 3 modèles de chaussures en 3D
- Rotation automatique et interactions
- Cartes produits avec effets hover

### 3. **Technologie APEX**
- Visualisation 3D des innovations
- Animations orbitales complexes
- Présentation des caractéristiques techniques

### 4. **À Propos**
- Statistiques animées
- Formes géométriques avec parallaxe
- Histoire de la marque

### 5. **Contact**
- Formulaire interactif
- Informations de contact
- Validation et feedback utilisateur

## 🎨 Identité de Marque APEX

### Couleurs Principales
- **Orange Principal** : `#ff6b35` - Énergie et innovation
- **Orange Secondaire** : `#f7931e` - Dynamisme
- **Noir** : `#1a1a1a` - Élégance et sophistication
- **Blanc** : `#ffffff` - Pureté et modernité

### Philosophie
APEX représente l'évolution dans le monde des chaussures de sport :
- **Performance** redéfinie
- **Innovation** technologique
- **Design** futuriste
- **Expérience** utilisateur immersive

## 🔧 Personnalisation

### Modifier les Couleurs
Dans `styles.css`, recherchez les variables CSS ou les couleurs hexadécimales :
```css
/* Couleur principale */
color: #ff6b35;
background: linear-gradient(45deg, #ff6b35, #f7931e);
```

### Ajouter des Produits
Dans `script.js`, modifiez la fonction `createShoeModel()` pour ajouter de nouveaux modèles.

### Personnaliser les Animations
Ajustez les paramètres GSAP dans `script.js` :
```javascript
gsap.to(element, {
    duration: 1,        // Durée
    y: 100,            // Déplacement
    opacity: 0,        // Opacité
    ease: 'power3.out' // Courbe d'animation
});
```

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Appareils
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablette (768px+)
- ✅ Mobile (320px+)

## ⚡ Performance

### Optimisations Incluses
- **Lazy loading** des ressources 3D
- **Debouncing** des événements scroll/resize
- **Cleanup** automatique des ressources Three.js
- **Compression** des textures et géométries
- **Responsive images** et assets

### Métriques Cibles
- **First Contentful Paint** : < 2s
- **Largest Contentful Paint** : < 3s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🐛 Dépannage

### Problèmes Courants

**Les éléments 3D ne s'affichent pas :**
- Vérifiez que WebGL est supporté
- Utilisez un navigateur récent
- Testez avec un serveur local

**Animations saccadées :**
- Réduisez le nombre de particules
- Diminuez la qualité du rendu 3D
- Fermez les autres onglets

**Erreurs de console :**
- Vérifiez la connexion internet (CDN)
- Assurez-vous que tous les fichiers sont présents

## 🚀 Améliorations Futures

### Fonctionnalités Prévues
- [ ] **Configurateur 3D** pour personnaliser les chaussures
- [ ] **Réalité Augmentée** pour essayage virtuel
- [ ] **Animations avancées** avec physics engine
- [ ] **Mode sombre** automatique
- [ ] **Internationalisation** multi-langues
- [ ] **E-commerce** intégration panier
- [ ] **Blog** et actualités
- [ ] **Compte utilisateur** et wishlist

### Optimisations Techniques
- [ ] **Service Worker** pour cache offline
- [ ] **WebAssembly** pour calculs 3D
- [ ] **Streaming** des modèles 3D
- [ ] **Analytics** et tracking utilisateur

## 📄 Licence

Ce projet est créé à des fins de démonstration. Tous les droits sont réservés.

## 👨‍💻 Développement

Développé avec ❤️ en utilisant les dernières technologies web pour créer une expérience utilisateur exceptionnelle.

---

**APEX - Performance Redéfinie** 🚀