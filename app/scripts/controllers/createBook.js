/**
 * Created by peto on 25.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .controller('CreateBookCtrl', ['$scope','DrilAPI', '$location',
    function ($scope, DrilAPI, $location) {

      $scope.book = {
        name : "test",
        langQuestion : "",
        langAnswer : "",
        category : "",
        level : "",
        isShared : true,
        tags : [],
        tagsStr :"ahoj, tu som"
      };


      DrilAPI.loadFilterOptions().then(function (res) {
        $scope.levels = res.data.levels;
        $scope.languages = res.data.languages;
        $scope.categories = res.data.categories;
      });


    }]);
