'use strict';

angular
  .module('webdrilApp', [
    'config',
    'ngAnimate',
    'ngRoute'
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
        controller: 'PublicBookCtrl'
      })

      .when('/book/:bookId', {
        templateUrl: 'views/public-lecture.html',
        controller: 'PublicLectureCtrl'
      })

      .when('/words', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
