'use strict';

/**
 * Service dédié à la gestion des Paramètres généraux de l'application.
 *
 * @memberof avalanche
 * @ngdoc services
 * @name Parametres
 * @param {service} $localStorage - native localStorage AngularJS service
 * @param {service} $rootScope - native rootScope AngularJS service
 */
angular.module('myApp').service('Parametres', function ($localStorage, $rootScope) {

  /************************
   * STATUTS DES VICTIMES *
   ***********************/

  /**
   * Structure d'object JavaScript réprésentant l'état d'une victime
   * @ngdoc Classes
   * @name VictimeStatus
   * @property {string} libelle - Intitulé du statut
   * @property {string} code - Alias unique de l'intitulé (identifiant)
   * @property {string} bg - Code hexa de la couleur DE FOND du statut (ex: '#ddd', '#AF43E1')
   * @property {string} text - Code hexa de la couleur DU TEXTE du statut (ex: '#ddd', '#AF43E1')
   */

  /**
   * Retourne les statuts de victimes de l'application, initialise les
   * statuts par défault s'ils ne sont pas définis
   * @memberof Parametres
   * @func getVictimeStatus
   * @returns {VictimeStatus[]} - Collection de statuts de victime
   */
  this.getVictimeStatus = function () {
    if (!$localStorage.victimeStatus) this.createDefaultVictimeStatus();
    return $localStorage.victimeStatus;
  };

  /**
   * Ajoute un statut de victime
   * @memberof Parametres
   * @func addVictimeStatus
   * @param {VictimeStatus} newStatus - Statut de victime à ajouter à l'application
   */
  this.addVictimeStatus = function (newStatus) {
    if ($localStorage.victimeStatus) {
      $localStorage.victimeStatus.push(newStatus);
      $rootScope.$broadcast('victimesUpdated');
    } else {
      console.log("$localStorage.victimeStatus n'est pas initialisé.");
    }
  };

  /**
   * Supprimer un statut de victime
   * @memberof Parametres
   * @param {VictimeStatus} status Statut de victime à supprimer
   * @func removeVictimeStatus
   */
  this.removeVictimeStatus = function (status) {
    let index = $localStorage.victimeStatus.indexOf(status);
    if (index == -1) console.log("Ce statut n'existe pas dans la liste des statuts.");
    else {
      $localStorage.victimeStatus.splice(index, 1);
      $rootScope.$broadcast('victimesUpdated');
    }
  };

  /**
   * Crée et persiste les statuts de victime par défaut
   * @memberof Parametres
   * @func createDefaultVictimeStatus
   */
  this.createDefaultVictimeStatus = function () {
    $localStorage.victimeStatus = [
      {libelle: 'Inconnu', code: '?', bg: '#fff', text: '#333'},
      {libelle: 'Indemne', code: 'I', bg: '#DCDDDE', text: '#333'},
      {libelle: 'Urgence relative', code: 'UR', bg: '#fffd36', text: '#000'},
      {libelle: 'Urgence absolue', code: 'UA', bg: '#b30000', text: '#fff'},
      {libelle: 'Décédée', code: 'DCD', bg: '#000', text: '#fff'}
    ];
  };

  /**
   * Retourne le statut de victime par défaut pour une
   * nouvelle victime
   * @memberof Parametres
   * @func defaultStatus
   * @returns {VictimeStatus} - Statut de victime par défaut
   */
  this.defaultStatus = function () {
    if (!$localStorage.victimeStatus) {
      this.createDefaultVictimeStatus();
    }
    return $localStorage.victimeStatus[0];
  };

  /***************************
   * SITUATIONS DES VICTIMES *
   **************************/

  /**
   * Retourne la collection des situations de victime en mémoire.
   * Si elles ne sont pas définis, crée les situations par défaut
   * @memberof Parametres
   * @func getVictimeSituations
   * @returns {string[]} - Collection de situations de victime
   */
  this.getVictimeSituations = function () {
    if (!$localStorage.victimeSituations) this.createDefaultVictimeSituations();
    return $localStorage.victimeSituations;
  };

  /**
   * Ajoute une situation de victime
   * @memberof Parametres
   * @func addVictimeSituation
   * @param {string} newSituation - Intitulé de la situation de victime à ajouter
   */
  this.addVictimeSituation = function (newSituation) {
    if ($localStorage.victimeSituations) {
      $localStorage.victimeSituations.push(newSituation);
      $rootScope.$broadcast('victimesUpdated');
    } else {
      console.log("$localStorage.victimeSituation n'est pas iniatilisé.");
    }
  };

  /**
   * Supprime une situation de victime
   * @memberof Parametres
   * @func removeVictimeSituation
   * @param {string} situation - Intitulé de la situation à supprimer
   */
  this.removeVictimeSituation = function (situation) {
    let index = $localStorage.victimeSituations.indexOf(situation);
    if (index == -1) console.log("Cette situation n'existe pas dans la liste des situations.");
    else {
      $localStorage.victimeSituations.splice(index, 1);
      $rootScope.$broadcast('victimesUpdated');
    }
  };

  /**
   * Crée les situation de victimes par défaut
   * @memberof Parametres
   * @func createDefaultVictimeSituations
   */
  this.createDefaultVictimeSituations = function () {
    $localStorage.victimeSituations = [
      'Inconnue',
      'Impliquée',
      'Ensevelie',
      'Désensevelie',
      'Évacuée'
    ];
  };

  /**
   * Retourne la situation par défaut d'une nouvelle victime
   * @memberof Parametres
   * @func defaultSituation
   * @returns {string} - Situation de victime par défaut
   */
  this.defaultSituation = function () {
    if (!$localStorage.victimeSituations) {
      this.createDefaultVictimeSituations();
    }
    return $localStorage.victimeSituations[0];
  };

  /************************
   *    CORPS DE METIER   *
   ***********************/

  /**
   * Structure d'object JavaScript réprésentant le corps de métier d'un intervenant
   * @ngdoc Classes
   * @name Metier
   * @property {string} libelle - Intitulé du corps de métier
   * @property {string} bg - Code hexa de la couleur DE FOND du corps de métier (ex: '#ddd', '#AF43E1')
   * @property {string} text - Code hexa de la couleur DU TEXTE du corps de métier (ex: '#ddd', '#AF43E1')
   */

  /**
   * Retourne la liste des corps de métier en mémoire. S'ils ne
   * sont pas défini, crée la liste par défault puis la retourne
   * @memberof Parametres
   * @func getMetiers
   * @returns {Metier[]} - Collection des corps de métiers
   */
  this.getMetiers = function () {
    if (!$localStorage.metiers) this.createDefaultMetiers();
    return $localStorage.metiers;
  };

  /**
   * Retourne un corps de métier, étant donné son in intitulé, null
   * si le métier n'existe pas ou plus en mémoire.
   * @memberof Parametres
   * @func getMetier
   * @param {string} lib - Libellé du métier recherché
   * @returns {Metier} - Object corps de métier correspondant à l'intitulé
   */
  this.getMetier = function (lib) {
    if (!$localStorage.metiers) this.createDefaultMetiers();
    for (let i = 0; i < $localStorage.metiers.length; i++) {
      if ($localStorage.metiers[i].libelle == lib) return $localStorage.metiers[i];
    }
    return null;
  };

  /**
   * Ajoute un corps de métier à la liste en mémoire
   * @memberof Parametres
   * @param {Metier} metier  - Corps de métier à ajouter à l'application
   * @fires metiersUpdated
   * @func addMetier
   */
  this.addMetier = function (metier) {
    if ($localStorage.metiers) {
      $localStorage.metiers.push(metier);
      $rootScope.$broadcast('metiersUpdated');
    } else {
      console.log("$localStorage.metiers n'est pas iniatilisé.");
    }
  };

  /**
   * Met à jour un métier, indexé par libellé
   * @memberof Parametres
   * @param {Metier} metier - Objet métier modifié
   * @fires metiersUpdated
   * @func modifyMetier
   */
  this.modifyMetier = function (metier) {
    let i = 0;
    let metiers = $localStorage.metiers;
    while (i < metiers.length && metiers[i].libelle != metier.libelle) {
      i++;
    }
    if (metiers[i].libelle == metier.libelle) {
      $localStorage.metiers[i].bg = metier.bg;
      $rootScope.$broadcast('metiersUpdated');
    }
  };

  /**
   * Supprime un corps de métier de l'application
   * @memberof Parametres
   * @func removeMetier
   * @param {Metier} metier Métier à supprimer
   * @fires metiersUpdated
   */
  this.removeMetier = function (metier) {
    let index = $localStorage.metiers.indexOf(metier);
    if (index == -1) console.log("Ce métier n'existe pas dans la liste des métiers.");
    else {
      $localStorage.metiers.splice(index, 1);
      $rootScope.$broadcast('metiersUpdated');
    }
  };

  /**
   * Crée la collection de métier par défaut de l'application
   * @memberof Parametres
   * @func createDefaultMetiers
   */
  this.createDefaultMetiers = function () {
    $localStorage.metiers = [
      {libelle: 'CRS', bg: '#b3ccff', text: '#000'},
      {libelle: 'Pisteur', bg: '#8b4ca0', text: '#fff'},
      {libelle: 'Moniteur', bg: '#ffdb4d', text: '#000'},
      {libelle: 'Gendarme', bg: '#001a66', text: '#fff'},
      {libelle: 'Pompier', bg: '#b30000', text: '#fff'},
      {libelle: 'Secouriste', bg: '#54a754', text: '#fff'}
    ];
  };

  /*****************
   *    LANGUES   *
   ****************/

  /**
   * Structure d'object JavaScript réprésentant le corps de métier d'un intervenant
   * @ngdoc Classes
   * @name Langue
   * @property {string} code - Alias court de la langue (ex: 'fr', 'en'...)
   * @property {string} intitule - Intitulé de la langue
   */

  /**
   * Crée la liste des métier par défaut de l'application
   * @memberof Parametres
   * @func createDefaultLanguages
   */
  this.createDefaultLanguages = function () {
    $localStorage.languages = [
      {code: 'fr', intitule: 'Français'},
      {code: 'en', intitule: 'English'}
    ];
  };

  /**
   * Retourne la langue choisie pour l'application,
   * par défault, la première langue de la liste de lanques.
   * @memberof Parametres
   * @func getCurrentLanguage
   * @returns {Langue}
   */
  this.getCurrentLanguage = function () {
    if (!$localStorage.language) {
      this.setLanguage(this.getLanguages()[0]);
    }
    return $localStorage.language;
  };

  /**
   * Retourne la liste des langues disponibles pour l'application
   * @memberof Parametres
   * @func getLanguages
   * @returns {Array<Langue>}
   */
  this.getLanguages = function () {
    if (!$localStorage.languages) this.createDefaultLanguages();
    return $localStorage.languages;
  };

  /**
   * Défini la langue de l'application
   * @memberof Parametres
   * @func setLanguage
   * @param {Langue} language Langue choisie pour l'application
   * @fires langUpdated
   */
  this.setLanguage = function (language) {
    $localStorage.language = language;
    $rootScope.$broadcast('langUpdated');
  };

  /*****************
   *    MISSIONS   *
   ****************/
  /**
   * Structure d'object JavaScript réprésentant un intervenant (ou personnel) d'une opération
   * @ngdoc Classes
   * @name Mission
   * @property {string} libelle - Intitulé de la mission
   * @property {date} beginDate - Date et heure d'entrée de démarrage de la mission
   */

  /**
   * Retourne la collection de missions possible pour un intervenant
   * @memberof Parametres
   * @func getMissions
   * @returns {string[]}
   */
  this.getMissions = function () {
    if (!$localStorage.missions) this.createDefaultMissions();
    return $localStorage.missions;
  };

  /**
   * Crée la liste des missions possibles pour un intervenant
   * @memberof Parametres
   * @func createDefaultMissions
   */
  this.createDefaultMissions = function () {
    $localStorage.missions = [
      'Recherche Chien',
      'Recherche DVA',
      'Recherche RECCO',
      'DSM',
      'COS CRS',
      'COS pisteur',
      'COS PGHM',
      'COS pompier',
      'Constatation judiciaire',
      'Secrétaire',
      'Pelletage',
      'Sondage',
      'Evacuation victime',
      'Prise en charge victime',
      'Balisage avalanche',
      'Guetteur',
      'Médicalisation',
      '-- Autre --'
    ];
  }
});
