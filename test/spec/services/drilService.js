'use strict';

describe('Factory DrilService', function () {

  // load the service's module
  beforeEach(module('webdrilApp'));

  // instantiate service
  var drilService;
  beforeEach(inject(function (_drilService_, _drilStorage_) {
    drilService = _drilService_;
    _drilStorage_.clear();
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


  it('should be next word', function () {
    var word = drilService.getNext();
    expect(word.id).toBe(1);
    var nextWord = drilService.rateAndGetNext(word, 1);
    expect(nextWord.id).toBe(2);
    nextWord = drilService.rateAndGetNext(nextWord, 1);
    expect(nextWord.id).toBe(3);
  });



  it('should be learned', function () {
    expect(drilService.getStatistics().count).toBe(0);
    var word = drilService.getNext();
    expect(drilService.getStatistics().count).toBe(0);
    drilService.rateAndGetNext(word, 1);
    expect(drilService.getStatistics().count).toBe(0);
    drilService.rateAndGetNext(word, 1);
    expect(drilService.getStatistics().count).toBe(1);
  });



});
