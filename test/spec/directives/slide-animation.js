'use strict';

describe('Directive: slideAnimation', function () {

  // load the directive's module
  beforeEach(module('webdrilApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<slide-animation></slide-animation>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the slideAnimation directive');
  }));
});
