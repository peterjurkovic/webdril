angular.module('webdrilApp')
  .factory('AuthInterceptor', ['AuthTokenFactory',
    function (AuthTokenFactory) {
    'use strict';
    return {
      request: addToken
    };
    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Token = 'Bearer ' + token;
      }
      return config;
    }
  }]);
