'use strict';

describe('Controller: PublicbookCtrl', function () {

  // load the controller's module
  beforeEach(module('webdrilApp'));

  var PublicBookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicBookCtrl = $controller('PublicBookCtrl', {
      $scope: scope
    });
  }));


});
