'use strict';


angular.module('webdrilApp')
  .factory('UserFactory', ['$http', 'ENV', 'AuthTokenFactory', 'DrilStorage',
    function ($http, ENV, AuthTokenFactory, DrilStorage) {

      var userSessionKey = 'loggedUser',
        localeKey = 'locale';

      function login(credentials) {
        return $http.put(ENV.api + '/user/login', credentials ).then(
          function success(response) {
            AuthTokenFactory.setToken(response.data.token);
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

      function getUserLocale(){
        var locale = DrilStorage.getItem(localeKey);
        if(locale === null){
          return 'en';
        }else{
          locale = locale.replace(/"/g, '');
        }
        return locale;
      }

      function setUserLocale(code){
        if(!code.length){
          code = 'en';
        }
        DrilStorage.setItem(localeKey, code);
      }

      function getUser() {
        return DrilStorage.getItemFromSession(userSessionKey);
      }

      return {
        login: login,
        logout: logout,
        getUser: getUser,
        getUserLocale : getUserLocale,
        setUserLocale : setUserLocale,
        activateAccount : activateAccount
      };

    }]);
