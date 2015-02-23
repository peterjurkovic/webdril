'use strict';

describe('Controller: LoginctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('webdrilApp'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));


});
