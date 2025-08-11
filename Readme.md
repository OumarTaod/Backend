# API de Gestion des Notes

Cette API permet de gérer des notes (CRUD) via des endpoints RESTful.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   node server.js
   ```

## Endpoints


### Créer une note
**POST** `/notes/ajouter`
#### Body (JSON)
```json
{
  "cours": "Mathématiques",
  "etudianat": "Nom de l'étudiant",
  "note": "15",
  "date": "2025-08-04T00:00:00.000Z" // optionnel
}
```
#### Réponse
```json
{
  "_id": "id",
  "cours": "Mathématiques",
  "etudianat": "Nom de l'étudiant",
  "note": "15",
  "date": "2025-08-04T00:00:00.000Z"
}
```

### Récupérer toutes les notes
**GET** `/notes/afficher`
#### Réponse
```json
[
  {
    "_id": "id",
    "cours": "Mathématiques",
    "etudianat": "Nom de l'étudiant",
    "note": "15",
    "date": "2025-08-04T00:00:00.000Z"
  }
]
```

### Récupérer une note par ID
**GET** `/notes/afficher/:id`
#### Réponse
```json
{
  "_id": "id",
  "cours": "Mathématiques",
  "etudianat": "Nom de l'étudiant",
  "note": "15",
  "date": "2025-08-04T00:00:00.000Z"
}
```

### Mettre à jour une note
**PUT** `/notes/modifier/:id`
#### Body (JSON)
```json
{
  "cours": "Physique",
  "etudianat": "Nom de l'étudiant",
  "note": "18",
  "date": "2025-08-04T00:00:00.000Z" // optionnel
}
```
#### Réponse
```json
{
  "_id": "id",
  "cours": "Physique",
  "etudianat": "Nom de l'étudiant",
  "note": "18",
  "date": "2025-08-04T00:00:00.000Z"
}
```

### Supprimer une note
**DELETE** `/notes/supprimer/:id`
#### Réponse
```json
{
  "message": "Note supprimée"
}
```

## Pagination et tri des notes

### Pagination
Pour afficher les notes par pages, utilisez les paramètres `page` et `limit` dans l'URL :

```
GET /api/notes?page=2&limit=5
```
- `page` : numéro de la page (par défaut 1)
- `limit` : nombre de notes par page (par défaut 10)

### Tri
Pour trier les notes, ajoutez les paramètres `sortBy` et `order` :

```
GET /api/notes?sortBy=date&order=desc
GET /api/notes?sortBy=cours&order=asc
```
- `sortBy` : champ de tri (`date` ou `cours`)
- `order` : `asc` (croissant) ou `desc` (décroissant)

### Exemple de réponse
```json
{
  "total": 100,
  "page": 2,
  "limit": 5,
  "items": [
    { "_id": "...", "cours": "Math", ... },
    ...
  ]
}
```

### Fonctionnement
- La pagination utilise les méthodes `.skip()` et `.limit()` de Mongoose.
- Le tri utilise `.sort({ [sortBy]: order })`.
- Le total des notes est retourné pour calculer le nombre de pages côté client.

### Utilisation
- Pour afficher la page 3 de 10 notes triées par matière croissante :
```
GET /api/notes?page=3&limit=10&sortBy=cours&order=asc
```

### Remarque
Si les paramètres ne sont pas fournis, la route retourne la première page de 10 notes triées par date décroissante.

## Gestion des erreurs
Les erreurs sont retournées au format JSON avec un message explicatif.

## Upload de fichiers

L'API permet d'uploader un fichier (ex : image, PDF) et de le rendre accessible publiquement.

#### Endpoint d'upload
- **POST** `/api/upload`
- Body : Form-data, clé `file` (type : fichier)
- Réponse :
```json
{
  "message": "Fichier uploadé avec succès",
  "fileUrl": "http://localhost:3000/uploads/nom-du-fichier"
}
```
#### Accès au fichier
- Les fichiers uploadés sont stockés dans le dossier `uploads/` à la racine du projet.
- Ils sont accessibles via l'URL `/uploads/nom-du-fichier`.

#### Exemple avec Postman
- Méthode : POST
- URL : `http://localhost:3000/api/upload`
- Body : Form-data, clé `file`, choisis un fichier à envoyer.

#### Exemple d'accès public
- Après upload, ouvre l'URL reçue dans la réponse pour télécharger ou afficher le fichier.

---

## Auteur
Oumar Diallo
