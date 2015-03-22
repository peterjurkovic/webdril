'use strict';


angular.module('webdrilApp')
  .factory('AuthTokenFactory', ['DrilStorage', '$log',
    function (DrilStorage, $log) {
    var key = "token-key";

    function getToken() {
      return DrilStorage.getItemFromSession(key);
    }

    function setToken(token) {
      if (token) {
        $log.info("Saving token into session storage: ");
        DrilStorage.setItemInSession(key, token);
      } else {
        $log.info("Removing token from session storage");
        DrilStorage.removeItemFromSession(key);
      }
    }

    return {
      getToken: getToken,
      setToken: setToken
    };
}]);
