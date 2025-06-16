# Gestion d'Hôtel API


## Structure du Projet

```
gestion-hotel-api
├── controllers
│   └── hotel.controller.js       # Contrôleur pour gérer les opérations CRUD sur les hôtels
├── models
│   └── hotel.model.js            # Modèle Mongoose pour le schéma des hôtels
├── routes
│   └── hotel.route.js            # Routes de l'API pour les hôtels
├── uploads
│   └── (dossier pour stocker les images uploadées)
├── index.js                      # Point d'entrée de l'application
├── package.json                  # Métadonnées et dépendances du projet
└── README.md                     # Documentation du projet
```

## Installation

1. Clonez le dépôt :
   ```
   git clone <URL_DU_DEPOT>
   cd gestion-hotel-api
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez votre base de données MongoDB dans le fichier `index.js`.

## Utilisation

1. Démarrez le serveur :
   ```
   npm start
   ```

2. L'API sera disponible à l'adresse `http://localhost:3000/api/hotels`.

## Endpoints

- `GET /api/hotels` : Récupérer la liste de tous les hôtels.
- `GET /api/hotels/:id` : Récupérer un hôtel par son ID.
- `POST /api/hotels` : Créer un nouvel hôtel.
- `PUT /api/hotels/:id` : Mettre à jour un hôtel existant.
- `DELETE /api/hotels/:id` : Supprimer un hôtel.

## Gestion des Images

La gestion des images des hôtels utilise désormais Cloudinary pour le stockage des fichiers. Lorsqu'une image est uploadée via l'API, elle est envoyée directement sur Cloudinary et n'est plus stockée localement dans le dossier `uploads`. Assurez-vous de configurer vos identifiants Cloudinary dans les variables d'environnement du projet.


## Lien avec le Frontend Angular

Pour lier cette API à un frontend Angular, utilisez le service `HttpClient` d'Angular pour effectuer des requêtes HTTP vers les endpoints de l'API. Assurez-vous d'importer `HttpClientModule` dans votre module Angular.

## Auteurs

- Ibrahima Niasse Diouf - Développeur junior

## License

Ce projet est sous licence Bakeli Work.