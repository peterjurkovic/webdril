'use strict';

angular
  .module('webdrilApp', [
    'config',
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dril.html',
        controller: 'DrilCtrl'
      })
      .when('/words', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    console.log($httpProvider);
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
