'use strict';


angular.module('webdrilApp')
  .factory('AuthTokenFactory', ['DrilStorage',
    function (DrilStorage) {
    var key = 'token-key';

    function getToken() {
      return DrilStorage.getItemFromSession(key);
    }

    function setToken(token) {
      if (token) {
        DrilStorage.setItemInSession(key, token);
      } else {
        DrilStorage.removeItemFromSession(key);
      }
    }

    return {
       getToken: getToken,
      setToken: setToken
    };
}]);
