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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
