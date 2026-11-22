# Application de gestion e-commerce via WhatsApp

## Présentation du projet

Ce projet consiste à développer une application web destinée aux petites entreprises qui utilisent WhatsApp comme principal canal de vente.

L'objectif est de centraliser la gestion des produits, du catalogue et des stocks au sein d'une plateforme accessible aussi bien sur ordinateur que sur téléphone.

Les clients pourront consulter les produits disponibles dans un catalogue en ligne et contacter directement le propriétaire via WhatsApp pour effectuer leurs commandes.

De son côté, le propriétaire disposera d'un tableau de bord lui permettant de gérer ses produits, d'enregistrer ses ventes conclues et de mettre à jour automatiquement ses stocks.

## Fonctionnalités principales

### 1. Catalogue client
- Consultation des produits disponibles.
- Affichage des photos, noms, descriptions et prix des produits.
- Affichage des quantités disponibles en stock.
- Commande via WhatsApp avec un message automatiquement prérempli.
- Interface adaptée aux ordinateurs, tablettes et téléphones.

### 2. Tableau de bord administrateur
- Authentification sécurisée du propriétaire.
- Ajout de nouveaux produits.
- Modification des informations des produits.
- Suppression de produits.
- Gestion des quantités en stock.
- Enregistrement des ventes conclues.
- Décrémentation automatique du stock après une vente.
- Alertes en cas de stock faible.

> **Remarque :** pour le moment, l'enregistrement d'une vente met à jour le stock, mais l'application ne conserve pas d'historique des ventes ni de statistiques. Ces fonctionnalités sont prévues comme évolutions futures (voir plus bas).

## Technologies utilisées

| Composant | Technologie |
|---|---|
| Interface utilisateur | HTML5 |
| Mise en forme | CSS3 |
| Interactivité | JavaScript |
| Backend | Node.js |
| Framework backend | Express.js |
| Base de données | PostgreSQL |
| Connexion à la base de données | Node.js (pg) |
| Authentification | JSON Web Token (JWT) |
| Sécurisation des mots de passe | bcryptjs |
| Configuration | dotenv, cors |

## Architecture du projet

```text
e-commerce_Whatsapp/
│
├── frontend/
│   ├── client/              # Interface du catalogue client
│   └── admin/               # Tableau de bord administrateur
│
├── backend/
│   ├── config/              # Configuration de l'application (connexion à la base)
│   ├── routes/              # Routes de l'API
│   ├── controllers/         # Logique de traitement
│   ├── middleware/          # Middlewares de sécurité
│   ├── scripts/             # Scripts utilitaires (création du compte admin)
│   ├── server.js            # Point d'entrée du serveur
│   └── .env.example         # Exemple de configuration
│
├── database/
│   └── schema.sql           # Structure de la base de données
│
├── .gitignore
└── README.md
```

## Installation et configuration

### Prérequis

Avant de commencer, assurez-vous de disposer des outils suivants :

- Node.js (version 18.11 ou plus récente)
- npm
- PostgreSQL (avec pgAdmin)
- Git
- Visual Studio Code (recommandé)

### 1. Cloner le dépôt

```bash
git clone https://github.com/MerlinFotso/e-commerce_Whatsapp.git
```

Accéder ensuite au dossier du projet :

```bash
cd e-commerce_Whatsapp
```

### 2. Installer les dépendances

Accéder au dossier backend :

```bash
cd backend
```

Installer les dépendances :

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend/` à partir du modèle `.env.example` :

```bash
cp .env.example .env
```

(Sous PowerShell : `Copy-Item .env.example .env`.)

Renseigner ensuite dans `.env` le mot de passe PostgreSQL et une valeur secrète pour `JWT_SECRET`.

> **Important :** le fichier `.env` contient des informations confidentielles. Il ne doit **jamais** être envoyé sur GitHub (il est déjà exclu par le `.gitignore`). Seul `.env.example`, qui ne contient aucun secret, est versionné.

### 4. Configurer la base de données

1. Créer une base de données PostgreSQL nommée `boutique_whatsapp` (avec pgAdmin ou `psql`).
2. Exécuter le fichier suivant dans cette base (Query Tool de pgAdmin, ou `psql`) :

```text
database/schema.sql
```

Ce fichier contient la structure des tables nécessaires au fonctionnement de l'application. Chaque développeur l'exécute une fois sur sa propre machine.

### 5. Démarrer le serveur

En mode développement :

```bash
npm run dev
```

### 6. Vérifier que tout fonctionne

Ouvrir dans le navigateur :

```text
http://localhost:3000/api/health
```

La réponse attendue est `{"ok":true}`.

## Feuille de route du développement

Le développement du projet sera réalisé progressivement selon les étapes suivantes :

- [x] Définition du cahier des charges et choix des technologies.
- [x] Création du dépôt GitHub.
- [x] Mise en place de l'architecture initiale du projet.
- [ ] Configuration de PostgreSQL.
- [ ] Développement du backend avec Node.js et Express.
- [ ] Création des routes de l'API.
- [ ] Développement du catalogue client.
- [ ] Développement du tableau de bord administrateur.
- [ ] Mise en place de l'authentification.
- [ ] Implémentation de la gestion des produits et des stocks.
- [ ] Intégration des commandes via WhatsApp.
- [ ] Tests et corrections.
- [ ] Déploiement de l'application sur le web.

## Évolutions possibles

- Historique des ventes (table `ventes`) et statistiques pour le propriétaire.
- Gestion de plusieurs comptes administrateurs avec des rôles différents.
- Version application mobile, selon le succès et le rendement du site.

## Équipe de développement

Projet développé en collaboration par deux contributeurs.

## État du projet

**En cours de développement.**

L'application est actuellement en phase de mise en place de son architecture technique. Les différentes fonctionnalités seront développées et intégrées progressivement.

## Objectif final

Mettre à disposition des petites entreprises une solution simple, accessible et efficace pour présenter leurs produits sur Internet, faciliter les commandes via WhatsApp et améliorer le suivi de leurs stocks.

---

