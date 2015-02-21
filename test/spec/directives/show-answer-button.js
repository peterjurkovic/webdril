'use strict';

describe('Directive: showAnswerButton', function () {

  // load the directive's module
  beforeEach(module('webdrilApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<show-answer-button></show-answer-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the showAnswerButton directive');
  }));
});
