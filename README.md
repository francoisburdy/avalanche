Projet Avalanche - M2 MIAGE - UGA
===========================

## Installation des dépendances

* Installer [Git](https://git-scm.com/downloads) (testé avec v2.11.1)
* Installer [Node.js](https://nodejs.org) (testé avec v4.5.0)
* Installer le [JDK Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (testé version 8 update 121)

### Installer Cordova

Mac/Linux

Cette installation peut durer pas mal de temps, selon le nombre de dépendances manquantes.

```sh
sudo npm install -g cordova bower jsdoc
```

Windows

```sh
C:\>npm install -g cordova bower jsdoc
```

## Récupérer le projet depuis Github

* [Créer un compte GitHub](https://github.com/join) (si c'est pas déjà fait)

```sh
git clone https://github.com/francoisburdy/avalanche.git
cd avalanche
cordova platform add android
cordova platform add browser
bower install
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

Pour enlever le message de "You have been opted out of telemetry." (sans importance)

```sh
$ cordova telemetry off
```

## Documentation technique

Le code des différents modules du projet est documenté avec JSDoc (et un template optimisé pour angular)

* Vous pouvez consulter la documentation sur un navigateur dans `doc/index.html`

```sh
# Dans le répertoire racine du projet avalanche/


# Installer JsDoc et le plugin angular-jsdoc
npm install jsdoc angular-jsdoc


# Générer automatiquement la documentation
jsdoc -c jsdoc.json

```

## Documentations des outils et dépendances
* [Documentation Apache Cordova](https://cordova.apache.org/docs/en/latest/)
* [Documentation Officielle AngularJS v1.5.9](https://code.angularjs.org/1.5.9/docs/api)
* [Utilisation de JSDoc](http://usejsdoc.org)
* [AngularJS template/plugin for JSDoc](https://github.com/allenhwkim/angular-jsdoc)

### Plugins cordova utilisés par l'application

Il n'est pas nécessaire d'installer manuellement ces plugins, ils sont enregistré dans la config du projet 
et donc installé automatiquement, dans la bonne version la première fois que l'application est compilée.

* [com.html2pdf.generator](https://github.com/cesarvr/pdf-generator) 0.9.8 "PDFGenerator"
* [cordova-plugin-camera](https://github.com/apache/cordova-plugin-camera) 2.3.1 "Camera"
* [cordova-plugin-compat](https://github.com/apache/cordova-plugin-compat) 1.1.0 "Compat"
* [cordova-plugin-dialogs](https://github.com/apache/cordova-plugin-dialogs) 1.3.1 "Notification"
* [cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen) 4.0.1 "Splashscreen"
* [cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar) 2.2.1 "StatusBar"
* [cordova-plugin-whitelist](https://github.com/apache/cordova-plugin-whitelist) 1.3.1 "Whitelist"
* [cordova-plugin-x-toast](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin) 2.5.2 "Toast"
* [ionic-plugin-keyboard](https://github.com/driftyco/ionic-plugin-keyboard) 2.2.1 "Keyboard"


## Rappel utilisation git

* Pull (à faire le plus souvent possible, pour éviter les conflicts)

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

## LICENCE
Tous droits réservés - Projet Avalanche - 2017