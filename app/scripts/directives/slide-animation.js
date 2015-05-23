'use strict';
angular.module('webdrilApp')
  .directive('slideAnimation', function ($timeout) {
    return {
      restrict : 'A',
      link : function (scope, element){
        var cls = 'animated bounceInLeft';
        element.on('click', '.dril-buttons .btn', function () {
          element.removeClass(cls);
          $timeout(function () {
            element.addClass(cls);
          }, 100);
        });
      }
    };
  });
