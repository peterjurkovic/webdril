angular.module('webdrilApp')
.factory('BookService', ['$http', function ($http) {

  function getPage(start, number, params) {
    console.log(params);
    return $http({
      url: 'http://drilapp.dev/api/books',
      method: "GET",
      params: params
    });
  };

  return {
    getPage: getPage
  };

}]);
