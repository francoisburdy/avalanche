# Projet Avalanche - M2 MIAGE - UGA

## Installation des dépendances

* Installer [Git](https://git-scm.com/downloads)

* Installer [Node.js](https://nodejs.org)

### Installer Cordova

Mac/Linux

```sh
$ sudo npm install -g cordova
```

Windows

```sh
C:\>npm install -g cordova
```

## Récupérer le projet depuis Github

* [Créer un compte GitHub](https://github.com/join) (si c'est pas déjà fait)

```sh
$ git clone https://github.com/francoisburdy/avalanche.git
$ cd avalanche
```
## Lancer l'application

Sur Android :

* Activer le téléphone en mode développeur
* Brancher le téléphone en USB
* Accepter la signature de l'ordinateur pour le débug (si nécessaire)

```sh
# Dans le répertoire racine du projet avalanche/
$ cordova run android
```

Sur iOS (disponible sur MacOS uniquement) :

```sh
# Dans le répertoire racine du projet avalanche/
$ cordova run ios
```

## Rappel utilisation git

* Pull

```sh
# Dans le répertoire racine du projet avalanche/
$ git pull
```

* Voir ses modifications : 

```sh
# Dans le répertoire racine du projet avalanche/

# Voir tous les fichiers modifiés
$ git status

# Voir le détails des modifications
$ git diff www/
```

* Commit & push

```sh
# Dans le répertoire racine du projet avalanche/

# Ajoute tous les fichiers modifiés au commit
$ git add .

# Commit avec message
$ git commit -m "Message de commit"

# Push
$ git push origin master

```


