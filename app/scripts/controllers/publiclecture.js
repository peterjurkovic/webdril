'use strict';

angular.module('webdrilApp')
  .controller('LectureCtrl', ['$scope','DrilAPI', '$location', '$routeParams', '$window', '$translate', 'Toast',
  function ($scope, DrilAPI, $location, $routeParams, $window, $translate, Toast) {
    $window.ga('send', 'pageview', { page: $location.url() });
    $scope.isLoading = true;
    $scope.book = null;
    DrilAPI.getBookLectures($routeParams.bookId).then(function (res) {
      $scope.isLoading = false;
      $scope.book = res.data;
    });


    $scope.goToLecture = function(id) {
      $location.path('/book/' + $scope.book.id + '/lecture/' + id);
    };


    $scope.forkBook = function(){

      DrilAPI.forkBook($scope.book.id).then(function(res){
        if(res.data.bookId){
          Toast.success($translate.instant('FORKED_SUCCESS'));
          $location.path('/manage/book/'+res.data.bookId);
        }else{
          Toast.danger($translate.instant('ERR'));
        }
      }, function(res){
        if(res.data.error.message){
          Toast.danger(res.data.error.message);
        }else{
          Toast.danger($translate.instant('ERR'));
        }
      });
    }
  }]);
