/**
 * Created by peto on 25.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .controller('CreateBookCtrl', ['$scope','DrilAPI', '$location', 'Toast', '$window', '$translate',
    function ($scope, DrilAPI, $location, Toast, $window, $translate) {
      $window.ga('send', 'pageview', { page: $location.url() });
      $scope.book = {
        name : '',
        question_lang_id : 0,
        answer_lang_id : 0,
        category_id : 0,
        level_id : 0,
        isShared : true,
        description : ''
      };


      DrilAPI.loadFilterOptions().then(function (res) {
        $scope.levels = res.data.levels;
        $scope.languages = res.data.languages;
        $scope.categoryList = res.data.categories;
      });

      $scope.create = function(isValid, book) {
        if (isValid && !$scope.pending) {
          $scope.pending = true;

          DrilAPI.createBook(book)
            .then(function (res) {
              if(res.data.id){
                  Toast.success($translate.instant('SAVED'));
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
          $translate('ERR_FORM').then(function(val){
            Toast.danger(val);
          });

        }
      };

    }]);
