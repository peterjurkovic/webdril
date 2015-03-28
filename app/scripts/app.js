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
      .when('/book/:bookId/lecture/:lectureId', {
        templateUrl: 'views/public-word.html',
        controller: 'PublicWordCtrl'
      })
      .when('/words', {
        templateUrl: 'views/word.html',
        controller: 'WordCtrl'
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      // auth
      .when('/manage/books', {
        templateUrl: 'views/user-books.html',
        controller: 'UserBookCtrl'
      })
      .when('/manage/book/:bookId', {
        templateUrl: 'views/user-lecture.html',
        controller: 'UserLectureCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });

  });
