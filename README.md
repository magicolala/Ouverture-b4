<div align="center">
  <img width="1200" height="475" alt="Rick Chess Coach Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  # ♟️ Rick Chess Coach — Sokolsky (1.b4)
  
  **Le système d'entraînement ultime pour maîtriser l'Orang-outan.**
  
  [Live Demo](https://ouverture-b4.onrender.com/) • [Report Bug](https://github.com/magicolala/Ouverture-b4/issues)
</div>

---

## 🚀 À propos du projet

**Rick Chess Coach** est une plateforme d'entraînement aux échecs spécialisée dans l'ouverture **1.b4 (Sokolsky/Orang-outan)**. Conçue par Rick Wallas, cette application permet de mémoriser et de pratiquer un répertoire complet grâce à un flux d'apprentissage inspiré de Chessable.

### ✨ Fonctionnalités Clés

- **📖 Mode LEARN** : Un apprentissage guidé pas à pas avec commentaires, flèches et annotations tactiques.
- **🎯 Mode PRACTICE** : Un moteur d'entraînement actif qui auto-joue les coups adverses et suit vos progrès avec un système de score.
- **📊 Lichess Stats Integration** : Explorez les statistiques réelles de Lichess (Masters & Amateur) directement dans l'interface.
- **🎨 Design "Wero"** : Une esthétique Neo-Brutalist premium, vibrante et moderne.
- **🔄 Transpositions** : Gestion intelligente des commentaires de transposition pour une clarté maximale.

## 🛠️ Stack Technique

- **Frontend** : React 18 + TypeScript
- **Styling** : Tailwind CSS 4.0 (Neo-Brutalist design system)
- **Build Tool** : Vite
- **Engine** : State machine personnalisée pour la gestion des sessions d'échecs.
- **Validation** : Validateur de répertoire intégré pour assurer l'intégrité des lignes PGN.

## 💻 Installation Locale

**Prérequis** : Node.js 20+

1. Clonez le repository :
   ```bash
   git clone https://github.com/magicolala/Ouverture-b4.git
   cd Ouverture-b4
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

Le cœur de l'application repose sur une machine à états située dans `src/engine/useSession.ts`, gérant la transition fluide entre l'apprentissage et la pratique.

```text
src/
├── data/           # Source de vérité du répertoire (repertoire.ts)
├── engine/         # Logique métier & State Machine
├── components/     # Composants UI Neo-Brutalist
├── pages/          # Vues principales (Home, Session, Explorer, Admin)
└── lib/            # Utilitaires (Validation PGN, Lichess API)
```

---

<div align="center">
  Développé avec ❤️ par <b>Rick Wallas</b>
</div>

