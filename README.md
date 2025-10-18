# Nexus Sport - Site Web 3D

Un site web 3D moderne et interactif pour Nexus Sport, une entreprise concurrente de Nike spécialisée dans les chaussures de sport avec technologie 3D.

## 🚀 Fonctionnalités

- **Design 3D Immersif** : Utilisation de Three.js pour des animations 3D fluides
- **Modèles 3D Interactifs** : Chaussures 3D rotatives avec effets de lumière
- **Design Responsive** : Optimisé pour tous les appareils
- **Animations Fluides** : Transitions et effets visuels modernes
- **Technologie 3D** : Section dédiée à l'impression 3D
- **Interface Moderne** : Design futuriste avec gradients et effets de lumière

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Animations, gradients, et design responsive
- **JavaScript ES6+** : Logique interactive
- **Three.js** : Rendu 3D et animations
- **WebGL** : Accélération matérielle pour les graphiques 3D

## 📁 Structure du Projet

```
nexus-sport-3d-website/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript et Three.js
├── package.json        # Configuration du projet
└── README.md          # Documentation
```

## 🚀 Installation et Lancement

### Méthode 1 : Serveur Python (Recommandée)
```bash
# Dans le répertoire du projet
python3 -m http.server 8000
```

### Méthode 2 : Serveur Node.js
```bash
# Installer les dépendances
npm install

# Lancer le serveur
npm start
```

### Méthode 3 : Serveur PHP
```bash
php -S localhost:8000
```

Puis ouvrez votre navigateur à l'adresse : `http://localhost:8000`

## 🎨 Sections du Site

### 1. Hero Section
- Animation 3D de chaussure principale
- Effets de particules flottantes
- Navigation fluide

### 2. Produits
- 3 modèles de chaussures 3D interactives
- Animations de rotation automatiques
- Effets de survol

### 3. Technologie
- Visualisation 3D d'une imprimante 3D
- Animation de processus d'impression
- Informations sur la technologie

### 4. À Propos
- Statistiques animées
- Design moderne avec gradients

### 5. Contact
- Formulaire interactif
- Validation côté client
- Design responsive

## 🎯 Fonctionnalités 3D

- **Modèles de Chaussures** : Création procédurale de modèles 3D
- **Éclairage Dynamique** : Système d'éclairage multi-sources
- **Animations** : Rotation automatique et mouvements fluides
- **Particules** : Effets de particules pour l'ambiance
- **Contrôles** : Navigation 3D avec OrbitControls

## 📱 Responsive Design

Le site s'adapte automatiquement à :
- **Desktop** : Expérience complète avec contrôles 3D
- **Tablet** : Interface optimisée pour tactile
- **Mobile** : Design adapté avec navigation hamburger

## 🎨 Palette de Couleurs

- **Primaire** : #00ff88 (Vert néon)
- **Secondaire** : #0088ff (Bleu)
- **Accent** : #ff0088 (Rose)
- **Fond** : #000000 (Noir)
- **Texte** : #ffffff (Blanc)

## 🔧 Personnalisation

### Modifier les Modèles 3D
Éditez la fonction `createHeroShoe()` dans `script.js` pour personnaliser le modèle principal.

### Changer les Couleurs
Modifiez les variables CSS dans `styles.css` :
```css
:root {
  --primary-color: #00ff88;
  --secondary-color: #0088ff;
  --accent-color: #ff0088;
}
```

### Ajouter de Nouveaux Produits
1. Ajoutez un nouveau `.product-card` dans `index.html`
2. Créez un nouveau modèle dans `createProductShoe()`
3. Ajoutez l'animation correspondante

## 🌐 Compatibilité Navigateurs

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📈 Performance

- **Optimisation 3D** : Modèles simplifiés pour de meilleures performances
- **Lazy Loading** : Chargement progressif des éléments 3D
- **Compression** : Assets optimisés
- **Cache** : Mise en cache des ressources

## 🚀 Déploiement

### GitHub Pages
1. Poussez le code sur GitHub
2. Activez GitHub Pages dans les paramètres
3. Sélectionnez la branche principale

### Netlify
1. Connectez votre repository GitHub
2. Configurez le build : `npm run build`
3. Déployez automatiquement

### Vercel
1. Importez le projet
2. Configurez les paramètres de build
3. Déployez en un clic

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : contact@nexussport.com
- Téléphone : +33 1 23 45 67 89

---

**Nexus Sport** - L'Innovation en Mouvement 🚀