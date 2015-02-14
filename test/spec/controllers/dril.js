'use strict';

describe('Controller: DrilCtrl', function () {

  // load the controller's module
  beforeEach(module('webdrilApp'));

  var DrilCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DrilCtrl = $controller('DrilCtrl', {
      $scope: scope
    });
  }));


});
