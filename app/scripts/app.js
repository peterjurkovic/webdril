'use strict';

angular
  .module('webdrilApp', [
    'config',
    'ngAnimate',
    'ngRoute',
    'pjToast',
    'pjTts',
    'ui.bootstrap',
    'ngFileUpload',
    'pascalprecht.translate'
  ])
  .constant('RATING', {
    'KNOW': 1,
    'NOT_YET': 3,
    'DO_NOT_KNOW': 5
  })
  .constant('LOCALES', {
    'locales': {
      'sk_SK': 'Slovenčina',
      'en_US': 'English'
    },
    'preferredLocale': 'en_US'
  })
  .config(function ($routeProvider, $httpProvider, $locationProvider, $translateProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/dril', {
        templateUrl: 'views/dril.html',
        controller: 'DrilCtrl'
      })
      .when('/books', {
        templateUrl: 'views/public-book.html',
        controller: 'BookCtrl'
      })
      .when('/book/:bookId', {
        templateUrl: 'views/public-lecture.html',
        controller: 'LectureCtrl'
      })
      .when('/book/:bookId/lecture/:lectureId', {
        templateUrl: 'views/public-word.html',
        controller: 'WordCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/singup', {
        templateUrl: 'views/singup.html',
        controller: 'SingupCtrl'
      })

      // auth
      .when('/manage/books', {
        templateUrl: 'views/user-books.html',
        controller: 'UserBookCtrl'
      })
      .when('/manage/book/create', {
        templateUrl: 'views/user-create-book.html',
        controller: 'CreateBookCtrl'
      })
      .when('/manage/book/:bookId', {
        templateUrl: 'views/user-lecture.html',
        controller: 'UserLectureCtrl'
      })
      .when('/manage/book/:bookId/lecture/:lectureId', {
        templateUrl: 'views/user-word.html',
        controller: 'UserWordCtrl'
      })
      .when('/manage/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $translateProvider.useStaticFilesLoader({
        prefix: 'res/locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
      });
      $translateProvider.preferredLanguage('en');// is applied on first load
      $translateProvider.useSanitizeValueStrategy(null);
  });
