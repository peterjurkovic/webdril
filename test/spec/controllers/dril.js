'use strict';

describe('Controller: DrilCtrl', function () {

  // load the controller's module
  beforeEach(module('webdrilApp'));

  var DrilCtrl,
      scope,
      element;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $compile) {
    scope = $rootScope.$new();
    DrilCtrl = $controller('DrilCtrl', {
      $scope: scope
    });
    element = angular.element(
      '<button ng-hide="isAnswerShown" ng-click="showAnswer()"></button>'
    );
    $compile(element)(scope);
    scope.$digest();
  }));


  it('should have shown get answer button ', function () {
    expect(scope.isAnswerShown).toBe(false);
    element.click();
    expect(scope.isAnswerShown).toBe(true);
  });


});
