'use strict';

describe('Factory drilStorage ', function () {


  beforeEach(module('webdrilApp'));


  var drilStorage;
  beforeEach(inject(function (_DrilStorage_) {
    drilStorage = _DrilStorage_;
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


  it('should  save retrieve update and remove item', function () {

    expect( drilStorage.setItemInSession("test", "test") ).toBe(true);
    expect( drilStorage.getItemFromSession("test") ).toBe("test");
    expect( drilStorage.setItemInSession("test", "test-2") ).toBe(true);
    expect( drilStorage.removeItemFromSession("test") ).toBe(true);
    expect( drilStorage.getItemFromSession("test") ).toBe(null);

    expect( drilStorage.setItemInSession("test", "test-2") ).toBe(true);
    expect( drilStorage.setItemInSession("test2", "test-2") ).toBe(true);

    drilStorage.clear()

    expect( drilStorage.getItemFromSession("test") ).toBeNull();
    expect( drilStorage.getItemFromSession("test2") ).toBeNull();
  });

});
