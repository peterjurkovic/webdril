'use strict';


angular.module('webdrilApp')
  .directive('showAnswerButton', ['$timeout', function ($timeout) {
    return {
      templateUrl: 'views/show-answer-button.html',
      restrict: 'E',
      replace : true,
      link: function postLink(scope, element, attrs) {
        var cls = 'animated fadeOutDown';

        element.bind("click", function () {
          element.addClass(cls);
        })

        scope.$on('answer-hidden', function (){
          element.removeClass(cls);
        });

      }
    };
  }]);
