'use strict';


angular.module('webdrilApp')
  .factory('UserFactory', ['$http', 'ENV', 'AuthTokenFactory', 'DrilService', 'DrilStorage', 'User',
    function ($http, ENV, AuthTokenFactory, DrilService, DrilStorage, User) {

    var userSessionKey = 'loggedUser';

    function login(credentials) {
      return $http.post(ENV.api + '/user/login', credentials ).then(
        function success(response) {
          User.info = response.data.user;
          AuthTokenFactory.setToken(response.data.token);
          DrilService.saveList(response.data.actiavtedWords);
          DrilStorage.setItemInSession(userSessionKey, response.data.user);
          return response;
        }
      );
    }

    function logout() {
      DrilStorage.clear();
      User.info = false;
    }


    function getUser() {
      return DrilStorage.getItemFromSession(userSessionKey);
    }

    return {
      login: login,
      logout: logout,
      getUser: getUser
    };

  }]);
