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
  .directive('translate', ['BookService', '$timeout', function( BookService , $timeout ){
    return {
      restrict: 'E',
      template :  '<div class="pj-translate" ng-if="showBox()">' +
                  '<div class="pj-loader-min" ng-if="isTranslating">Translating...</div>' +
                  '<div ng-if="!isTranslating && translation" ng-click="useTranslation()">{{translation}}</div>' +
                  '</div>',
      scope : {
        from : '@translateFrom',
        to : '@translateTo',
        text : '@translateVal',
        updateModel : '=updateModel'
      },
      link : function(scope){
        scope.showBox = function () {
          return scope.isTranslating || scope.translation;
        };

        function hideBox(){
          scope.isTranslating = false;
          scope.translation = false;
        }

        var debounce;
        scope.$watch('text', function(newValue, oldValue) {
          if (newValue !== oldValue && !scope.updateModel.length){
            $timeout.cancel(debounce);
            scope.isTranslating = true;
            debounce = $timeout(function(){
              BookService.translate( scope.text, scope.from, scope.to).then(function(res){
                if(res.data.result){
                    scope.translation = res.data.result;
                  }else{
                    hideBox();
                 }
              }).finally(function(){
                scope.isTranslating = false;
              });
            }, 1500);
          }else{
            $timeout.cancel(debounce);
            hideBox();
          }
        });

        scope.useTranslation = function(){
          if(!scope.updateModel.length){
            scope.updateModel = scope.translation;
          }
          hideBox();
        }

        hideBox();
        }
     };
  }]);
