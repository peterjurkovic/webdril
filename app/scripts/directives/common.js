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
    };
  }])
  .directive('translate', ['DrilAPI', '$timeout', function( DrilAPI , $timeout ){
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
          if (newValue && newValue.length > 2 && newValue !== oldValue && !scope.updateModel.length){
            $timeout.cancel(debounce);
            scope.isTranslating = true;
            debounce = $timeout(function(){
              DrilAPI.translate( scope.text, scope.from, scope.to).then(function(res){
                if(res.data.result){
                  scope.translation = res.data.result;
                }else{
                  hideBox();
                }
              }).finally(function(){
                scope.isTranslating = false;
              });
            }, 800);
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
        };

        hideBox();
      }
    };
  }])
  .directive('drilNav', [function(){
    return {
      restrict: 'E',
      template : '<button class="btn btn-success btn-xs"><span class="glyphicon glyphicon-plus-sign"></span></button>',
      scope : {
        word : '='
      },
      controller: function(){
        console.log('controller');
      },
      link : function(scope, element, attrs) {
          console.log(scope.word);
      }

    };
  }])
.directive('pjUnique', ['ENV', '$http', '$q', function(ENV, $http, $q) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
          return $http.post(ENV.api + '/check', {
            field: attrs.pjUnique,
            value: viewValue
          }).then(function(response) {
              if (!response.data.isUnique) {
                return $q.reject(response.data.errorMessage);
              }
              return true;
            }
          );
        };
      }
    };
}])
.directive('pjMatch', function($parse){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl){
      var getPass = $parse(attrs.pjMatch),
          validator = function (value) {
        var matches = value === getPass(scope);
        ctrl.$setValidity('match', matches);
        return matches ? value : undefined;
      };
      ctrl.$parsers.unshift(validator);
      ctrl.$formatters.unshift(validator);

      scope.$watch(getPass, function(){
        ctrl.$$parseAndValidate();
      });
    }
  };
})
.directive('pjTags', ['$log', '$parse', function($log, $parse){
    return {
      restrict: 'E',
      template : '<ul class="pj-tags"><li ng-repeat="tag in tags">'+
      '<span class="glyphicon glyphicon-tag"></span>{{tag}}'+
      '</li></ul>',
      link : function(scope, element, attrs){
        scope.tags = []

        var getTags = function(value){
          var arr = _.uniq( value.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/));
          return arr;
        };

        scope.$watch(attrs.input, function(newVal, oldVal){
          console.log(newVal, oldVal);
          if(!newVal){
            scope.tags = [];
          }else if(newVal.slice(-1) === ','){
            scope.tags =  getTags(newVal);
          }
        });
      }
    }
  }])
  .directive('ngEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });
