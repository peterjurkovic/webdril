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
      scope : {
        orderBy : '='
      },
      link : function (scope, element, attrs){
        element.bind('click', function($event) {
          element.parent().find('.active').removeClass('active');
          element.addClass('active');
          console.log(scope);
          scope.state.orderBy = orderBy;
        });
      }
    };
  }]);
