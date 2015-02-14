'use strict';

describe('Factory DrilFactory', function () {

  // load the service's module
  beforeEach(module('webdrilApp'));

  // instantiate service
  var DrilService;
  beforeEach(inject(function (_DrilFactory_) {
    DrilService = _DrilFactory_;
  }));

  it('should be defined', function () {
    expect(DrilService).toBeDefined();
  });


  it('should be defined', function () {
    expect(DrilService.getNext).toBeDefined();
  });





});
