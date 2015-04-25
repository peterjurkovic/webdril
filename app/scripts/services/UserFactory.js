'use strict';


angular.module('webdrilApp')
  .factory('UserFactory', ['$http', 'ENV', 'AuthTokenFactory', 'DrilService', 'DrilStorage',
    function ($http, ENV, AuthTokenFactory, DrilService, DrilStorage) {

    var userSessionKey = 'loggedUser';

    function login(credentials) {
      return $http.post(ENV.api + '/user/login', credentials ).then(
        function success(response) {
          AuthTokenFactory.setToken(response.data.token);
          DrilService.saveList(response.data.actiavtedWords);
          DrilStorage.setItemInSession(userSessionKey, response.data.user);
          return response;
        }
      );
    }

    function activateAccount(token){
      return $http.post(ENV.api+ '/users/activate',{token: token});
    }

    function logout() {
      DrilStorage.clear();
    }


    function getUser() {
      return DrilStorage.getItemFromSession(userSessionKey);
    }

    return {
      login: login,
      logout: logout,
      getUser: getUser,
      activateAccount : activateAccount
    };

  }]);
