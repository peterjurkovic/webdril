'use strict';

angular
  .module('webdrilApp', [
    'config',
    'ngAnimate',
    'ngRoute',
    'smart-table'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/dril.html',
        controller: 'DrilCtrl'
      })

      .when('/books', {
        templateUrl: 'views/public-book.html',
        controller: 'PublicBookCtrl',
        controllerAs: 'books'
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
  });
