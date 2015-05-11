'use strict';

angular.module('webdrilApp')
  .controller('FooterCtrl', ['$scope', '$modal',
    function ($scope, $modal) {

      $scope.contact = function () {
        var modalBox = $modal.open({
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl'
        });
        modalBox.result.then(function () {

        });
      };

    }]);
