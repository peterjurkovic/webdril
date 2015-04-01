/**
 * Created by peto on 12.3.2015.
 */
'use strict';


angular.module('webdrilApp')
  .directive('pjPagination', ['ENV', function (ENV) {
    return {
      templateUrl: 'views/pagination.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var totalPages = Math.ceil(scope.totalItems / ENV.itemsPeerPage),
          maxNeighbor= 5;

        if(totalPages > 1){
          scope.pages = [];
          scope.pages.push(1);
          var start = 2;
          if(scope.state.currentPage - maxNeighbor - 1 > 0){
            start = scope.state.currentPage - maxNeighbor;
          }
          for(var pageNumber = start; pageNumber <= scope.state.currentPage; pageNumber++){
            scope.pages.push(pageNumber);
          }
          var stop = totalPages;
          if(scope.state.currentPage + maxNeighbor + 1 <= totalPages){
            stop = scope.state.currentPage + maxNeighbor + 1;
          }

          for(pageNumber = scope.state.currentPage +1; pageNumber < stop; pageNumber++  ){
            scope.pages.push(pageNumber);
          }
          if(scope.pages[scope.pages.length - 1] !== totalPages){
            scope.pages.push(totalPages);
          }
        }

      }
    };
  }])
  .directive('pjSort', [function(){
    return {
      template : '<span class="pj-ico-wrapp"><span class="glyphicon glyphicon-triangle-top"></span>'+
                  '<span class="glyphicon glyphicon-triangle-bottom"></span></span><span class="pj-text" ng-transclude></span>',
      restrict: 'A',
      transclude: true,
      scope : { },
      link : function (scope, element, attrs){
        var pjActiveClass = 'pj-sort-active',
            pjReverseClass = 'pj-sort-asc';
        element.bind('click', function() {
          element.parent().find('.'+pjActiveClass).removeClass(pjActiveClass);
          element.addClass(pjActiveClass);
          element.toggleClass(pjReverseClass);
          scope.$parent.state.orderBy = attrs.pjSort;
          scope.$parent.state.orderType = element.hasClass(pjReverseClass) ? 0 : 1;
          scope.$parent.state.currentPage = 1;
          scope.$parent.renderBooks();
        });
      }
    };
  }])
  .directive('ngReallyClick', [function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          var message = attrs.ngReallyMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.ngReallyClick);
          }
        });
      }
    }
  }])
  .directive('pjEditable', [function() {
    return {
      template: '<span>' +
                '<span ng-if="!editing">{{value}}</span>' +
                '<span ng-if="editing">' +
                '<input ng-switch-when="true" type="text" ng-model="$parent.value"/></span>' +
                '</span>',
      scope: {
        value: '='
      },
      restrict: 'A',
      link: function(scope, element, attrs) {
        console.log(attrs);
        console.log(scope);

        /* enable inline editing functionality */
        var enablingEditing = function () {
          scope.editing = true;
          var input = element.find('input');
          setTimeout(function () {
            input.focus();
            input.bind('blur', function (e) {
              scope.$apply(function () {
                disablingEditing();
              });
            });
          }, 100);
        };


        /* disable inline editing functionality */
        var disablingEditing = function () {
          scope.editing = false;
          scope.inline = scope.value;
        };


        /* set up the default */
        disablingEditing();
        console.log(scope);

        /* when the element with the inline attribute is clicked, enable editing */
        element.bind('click', function (e) {
          console.log(e);
          if ((e.target.nodeName.toLowerCase() === 'span')) {
            scope.$apply(function () { // bind to scope
              enablingEditing();
            });
          }
        });

        // end link fnc
      }
    }
  }]);
