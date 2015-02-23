'use strict';


angular.module('webdrilApp')
  .factory('UserFactory', ['$http', 'ENV', 'AuthTokenFactory', '$q',
    function ($http, ENV, AuthTokenFactory, $q) {

    function login(credentials) {
      return $http.post(ENV.api + '/user/login', {
        login: credentials.login,
        password: credentials.password
      }).then(function success(response) {
        AuthTokenFactory.setToken(response.token);
        return response;
      });
    }
    function logout() {
      AuthTokenFactory.setToken();
    }


    function getUser() {
      if (AuthTokenFactory.getToken()) {
        return $http.get(API_URL + '/me');
      } else {
        return $q.reject({ data: 'client has no auth token' });
      }
    }

    return {
      login: login,
      logout: logout,
      getUser: getUser
    }

  }]);
