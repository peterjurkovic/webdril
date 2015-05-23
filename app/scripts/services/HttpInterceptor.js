'use strict';
angular.module('webdrilApp')
  .factory('HttpInterceptor', ['AuthTokenFactory', '$q', 'Toast', '$rootScope', 'AUTH_EVENTS', '$location', '$filter',
    function (AuthTokenFactory, $q, Toast, $rootScope, AUTH_EVENTS, $location, $filter) {


    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

     function handleError(res) {
       if(res.status === 401 &&  $location.path() !== '/login'){
           Toast.warning($filter('translate')('LOGOUT_SUCCESS'));
         $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
       }else if(res.status > 500){
           Toast.danger($filter('translate')('ERR'));
       }
       return $q.reject(res);
      }

    return {
      request: addToken,
      responseError : handleError
    };
  }]);
