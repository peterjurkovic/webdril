'use strict';


angular.module('webdrilApp')
  .factory('AuthTokenFactory', ['DrilStorage', function () {

    var key = "token-key";

    function getToken() {
      return DrilStorage.setItemInSession(key);
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
