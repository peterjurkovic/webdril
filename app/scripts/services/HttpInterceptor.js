'use strict';
angular.module('webdrilApp')
  .factory('HttpInterceptor', ['AuthTokenFactory', 'Toast', '$q',
    function (AuthTokenFactory, Toast, $q) {


    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

     function handleError(res) {
        console.log(res);

      }

    return {
      request: addToken,
      responseError : handleError
    };
  }]);
