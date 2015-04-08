(function(window, angular, undefined) {
  'use strict';

  angular
    .module('angularInlineEdit.directives', [
      'angularInlineEdit.controllers'
    ])
    .directive('inlineEdit', ['$compile',
      function($compile) {
        return {
          restrict: 'A',
          controller: 'InlineEditController',
          scope: {
            model: '=inlineEdit',
            callback: '&inlineEditCallback',
            validate: '&inlineEditValidation'
          },
          link: function(scope, element, attrs) {
            scope.model = scope.$parent.$eval(attrs.inlineEdit);
            if (attrs.hasOwnProperty('inlineEditCancelOnBlur')) {
              scope.cancelOnBlur = true;
            }

            var container = angular.element(
              '<div class="ng-inline-edit" ' +
              'ng-class="{\'ng-inline-edit--validating\': validating, ' +
              '\'ng-inline-edit--error\': validationError}">');

            var input = angular.element(
              '<textarea rows="1" class="form-control ng-inline-edit__input" ' +
              'ng-disabled="validating" ' +
              'ng-show="editMode" ' +
              'ng-keyup="onInputKeyup($event)" ' +
              'ng-model="inputValue" ></textarea>');
            var innerContainer = angular.element(
              '<div class="ng-inline-edit__inner-container"></div>');

            // text
            innerContainer.append(angular.element(
              '<span class="ng-inline-edit__text" ' +
              (attrs.hasOwnProperty('inlineEditOnClick') ?
                'ng-click="editText()" ' : '') +
              'ng-hide="editMode">{{model}}</span>'));

            // button
            if (attrs.inlineEditBtnEdit) {
              innerContainer.append(angular.element(
                '<a title='+attrs.inlineEditButtonHtml+
                ' class="btn btn-xs ng-inline-edit__button" ng-if="!editMode"'+
                'ng-click="editText()"><span class="glyphicon glyphicon-pencil"></span>'+
                '</a>'));
            }
            // save button
            if (attrs.inlineEditBtnSave) {
              var saveBtn = angular.element(
                '<a class="ng-inline-save__button btn pj-btn btn-warning" ng-if="editMode && !validating" title="' + attrs.inlineEditBtnSave + '" ' +
                'ng-click="applyText(false, false)"><span class="glyphicon glyphicon-floppy-disk"></a>');
            }

            container
              .append(input)
              .append(saveBtn || '')
              .append(innerContainer);

            element
              .append(container);

            scope.editInput = input;

            attrs.$observe('inlineEdit', function(newValue) {
              scope.model = scope.$parent.$eval(newValue);
              $compile(element.contents())(scope);
            });
          }
        };
      }
    ]);

})(window, window.angular);
