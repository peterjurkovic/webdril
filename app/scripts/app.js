'use strict';

angular
  .module('webdrilApp', [
    'config',
    'ngAnimate',
    'ngRoute',
    'pjToast',
    'angularInlineEdit',
    'ui.bootstrap'
  ])
  .constant('RATING', {
    'KNOW': 1,
    'NOT_YET': 3,
    'DO_NOT_KNOW': 5
  })
  .value('User', {
    info : false,
    settings : {
      locale : 'en',
      drilStrategy : 1
    }
  })
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('HttpInterceptor');
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
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
      .when('/words', {
        templateUrl: 'views/word.html',
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
      .otherwise({
        redirectTo: '/'
      });
  });


(function(window, angular) {
  'use strict';

  angular
    .module('angularInlineEdit', [
      'angularInlineEdit.controllers',
      'angularInlineEdit.directives'
    ]);

})(window, window.angular);
