angular.module('webdrilApp')
  .factory('AuthInterceptor', ['AuthTokenFactory',
    function (AuthTokenFactory) {
    'use strict';
    return {
      request: addToken
    };
    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      console.log(token);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }]);
