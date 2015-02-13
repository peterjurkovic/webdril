'use strict';

/**
 * @ngdoc overview
 * @name webdrilApp
 * @description
 * # webdrilApp
 *
 * Main module of the application.
 */
angular
  .module('webdrilApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dril.html',
        controller: 'DrilCtrl'
      })
      .when('/words', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
