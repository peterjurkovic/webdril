angular.module('webdrilApp')
.factory('BookService', ['$http', 'ENV', function ($http, ENV) {

  return {
    getPage: getPage
  };

  function getPage(start, number) {
    return $http({
      url: ENV.api+ '/books',
      method: "GET",
      params : {
        start: start,
        number : number
      }
    });
  }

}]);
