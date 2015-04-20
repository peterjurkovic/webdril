'use strict';
angular.module('webdrilApp')
  .factory('HttpInterceptor', ['AuthTokenFactory', '$q',
    function (AuthTokenFactory, $q) {


    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

     function handleError(rejection) {
       return $q.reject(rejection);
      }

    return {
      request: addToken,
      responseError : handleError
    };
  }]);
