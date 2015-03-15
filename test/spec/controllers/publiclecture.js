'use strict';

describe('Controller: PubliclectureCtrl', function () {

  // load the controller's module
  beforeEach(module('webdrilApp'));

  var PubliclectureCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PubliclectureCtrl = $controller('PubliclectureCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
