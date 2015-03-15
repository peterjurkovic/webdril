'use strict';


angular.module('webdrilApp')
.factory('BookService', ['$http', 'ENV', function ($http, ENV) {

  return {
    getPage: getPage,
    getLanguagesAndLevels :  getLanguagesAndLevels
  };

  function getPage(params) {
    return $http({
      url: ENV.api+ '/books',
      method: "GET",
      params : params
    });
  }

  function getLanguagesAndLevels(){
    return $http({
      url: ENV.api+ '/filter',
      method: "GET"
    });
  }

}]);
