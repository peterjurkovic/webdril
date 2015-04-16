'use strict';
angular.module('webdrilApp')
  .factory('HttpInterceptor', ['AuthTokenFactory', 'Toast',
    function (AuthTokenFactory, Toast) {


    function addToken(config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }

     function handleError(rejection) {
        console.log(rejection);
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      }

    return {
      request: addToken,
      responseError : handleError
    };
  }]);
