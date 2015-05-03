'use strict';
angular.module('webdrilApp')
  .factory('HttpInterceptor', ['AuthTokenFactory', '$q', 'Toast', '$rootScope', 'AUTH_EVENTS',
    function (AuthTokenFactory, $q, Toast, $rootScope, AUTH_EVENTS) {


    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

     function handleError(res) {
       if(res.status === 401 ){
         Toast.warning('You have been logged out.');
         $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
       }else if(res.status > 500){
         Toast.danger('An unexpected error has occurred.');
       }
       return $q.reject(res);
      }

    return {
      request: addToken,
      responseError : handleError
    };
  }]);
