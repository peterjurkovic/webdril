'use strict';

describe('Factory drilStorage ', function () {


  beforeEach(module('drilStorageModule'));


  var drilStorage;
  beforeEach(inject(function (_drilStorage_) {
    drilStorage = _drilStorage_;
  }));

  it('should be defined', function () {
    expect(drilStorage).toBeDefined();
  });



  it('should  save retrieve update and remove item', function () {
    expect( drilStorage.setItem("test", "test") ).toBe(true);
    expect( drilStorage.getItem("test") ).toBe("test");
    expect( drilStorage.setItem("test", "test-2") ).toBe(true);
    expect( drilStorage.removeItem("test") ).toBe(true);
    expect( drilStorage.getItem("test") ).toBe(null);
  });

});
