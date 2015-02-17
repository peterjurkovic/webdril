'use strict';

describe('Factory DrilService', function () {

  // load the service's module
  beforeEach(module('webdrilApp'));

  // instantiate service
  var drilService;
  beforeEach(inject(function (_drilService_) {
    drilService = _drilService_;
  }));

  it('should be defined', function () {
    expect(drilService).toBeDefined();
  });


  it('should be return 1 ', function () {
    var word = drilService.getNext();
    expect(word).toBeDefined();
    expect(word).not.toBeNull();
    expect(word.id).toBe(1);
  });


  it('should process rating', function () {
    var word = drilService.getNext();
    var nextWord = drilService.processRatingAndGetNext(word, 1);
    expect(nextWord.id).toBe(2);
    nextWord = drilService.processRatingAndGetNext(nextWord, 1);
    expect(nextWord.id).toBe(3);
  });



});
