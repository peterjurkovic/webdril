/**
 * Created by peto on 25.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .controller('CreateBookCtrl', ['$scope','DrilAPI', '$location', 'Toast',
    function ($scope, DrilAPI, $location, Toast) {

      $scope.book = {
        name : "test",
        question_lang_id : 1,
        answer_lang_id : 2,
        category_id : 10,
        level_id : 3,
        isShared : true
      };


      DrilAPI.loadFilterOptions().then(function (res) {
        $scope.levels = res.data.levels;
        $scope.languages = res.data.languages;
        $scope.categories = res.data.categories;
      });

      $scope.create = function(isValid, book) {
        if (isValid && !$scope.pending) {
          $scope.pending = true;

          DrilAPI.createBook(book)
            .then(function (res) {
              if(res.data.id){
                Toast.success('The book has been successfully created');
                $location.path('/manage/book/' + res.data.id);
              }
            }, function (res) {
              console.log(res.status === 400);
              if (res.status === 400) {
                Toast.danger(res.data.error.message);
              }
            })
            .finally(function () {
              $scope.pending = false;
            });
        } else {
          Toast.danger('The form contains errors.');
        }
      }

    }]);
