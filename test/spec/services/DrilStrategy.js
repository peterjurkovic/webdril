'use strict';

describe('DrilStrategy', function () {

  // load the service's module
  beforeEach(module('webdrilApp'));

  // instantiate service
  var DrilStrategy,
      list = [];

  beforeEach(inject(function (_DrilStrategy_) {
    DrilStrategy = _DrilStrategy_;
  }));

  beforeEach(function() {
    jasmine.clock().install();
    initList();
  });

  describe('the latest strategy', function(){

    it('should select ', function(){
      function expectedWordId(expectedId){
        jasmine.clock().mockDate(new Date());
        jasmine.clock().tick(1);
        var now = new Date().getTime(),
          word = DrilStrategy.selectLatest(list);
        expect(word.id).toBe(expectedId);
        word.lastViewed = now;
      }

      expectedWordId(3);
      expectedWordId(4);
      expectedWordId(6);
      expectedWordId(8);
      expectedWordId(9);
      expectedWordId(10);
      expectedWordId(2);
      expectedWordId(1);
      expectedWordId(5);
      expectedWordId(7);
      expectedWordId(3);
      expectedWordId(4);
    });


  });


  describe('the selectWorstRated rated word strategy', function(){

    beforeEach(function() {
      initList();
    });

    function expectedWordId(expectedId){
      jasmine.clock().mockDate(new Date());
      jasmine.clock().tick(1);
      var now = new Date().getTime(),
        word = DrilStrategy.selectWorstRated(list);
      expect(word.id).toBe(expectedId);
      word.lastViewed = now;
    }

    it('should select ', function(){
      expectedWordId(10);
    });

    it('should select ', function(){
      list[9].lastViewed = new Date().getTime();
      expectedWordId(1);
    });


    it('should select ', function(){
      list[9].lastViewed = new Date().getTime();
      jasmine.clock().tick(1);
      list[3].lastViewed = new Date().getTime();
      list[3].lastRating = 5;
      expectedWordId(5);
      expectedWordId(3);
    });


  });


  describe('the most problematic word strategy', function(){

    beforeEach(function() {
      initList();
    });

    function expectedWordId(expectedId){
      jasmine.clock().mockDate(new Date());
      jasmine.clock().tick(1);
      var now = new Date().getTime(),
        word = DrilStrategy.selectMostProblematic(list);
      expect(word.id).toBe(expectedId);
      word.lastViewed = now;
    }

    it('should select ', function(){
      expectedWordId( 10 );
    });

    it('should select ', function(){
      list[3].viewed = 2;
      expectedWordId( 4 );
    });

    it('should select ', function(){
      list[3].viewed = 2;
      list[4].viewed = 3;
      list[4].lastRating = 5;
      expectedWordId( 4 );
    });




  });


  function initList(){
    list =
      [
        {
          "id": 1,
          "question": "fare [f\u00e9]",
          "answer": "fare",
          "lastRating": null,
          "viewed": 0,
          "isLearned": 0,
          "lastViewed": 10,
          "changed_timestamp": 1431901576,
          "langQuestion": "en",
          "langAnswer": "en"
        },
        {
          "id": 2,
          "question": "exception [eks\u00e9p\u0161n]",
          "answer": "exception",
          "lastRating": null,
          "viewed": 5,
          "isLearned": 1,
          "lastViewed": 5,
          "changed_timestamp": 1431901576,
          "langQuestion": "en",
          "langAnswer": "en"
        },
        {
          "id": 3,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": null,
          "viewed": 0,
          "isLearned": 0,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 4,
          "question": "4 slocisko",
          "answer": "dreadful",
          "lastRating": null,
          "viewed": 0,
          "isLearned": 0,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 5,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": 5,
          "viewed": 1,
          "isLearned": 0,
          "lastViewed": 40,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 6,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": null,
          "viewed": 0,
          "isLearned": 0,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 7,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": 3,
          "viewed": 5,
          "isLearned": 0,
          "lastViewed": 50,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 8,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": null,
          "viewed": 0,
          "isLearned": 0,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 9,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": 1,
          "viewed": 5,
          "isLearned": 1,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        },
        {
          "id": 10,
          "question": "hrozn\u00fd",
          "answer": "dreadful",
          "lastRating": 3,
          "viewed": 2,
          "isLearned": 0,
          "lastViewed": null,
          "changed_timestamp": 1431806110,
          "langQuestion": "en",
          "langAnswer": "cs"
        }
      ];
  }


});
