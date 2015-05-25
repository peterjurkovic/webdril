/**
 * Created by peto on 25.5.2015.
 */
'use strict';

describe('Similarity', function () {

  // load the service's module
  beforeEach(module('webdrilApp'));

  // instantiate service
  var Similarity,
    list = [];

  beforeEach(inject(function (_Similarity_) {
    Similarity = _Similarity_;
  }));



  describe('compute distance', function(){

    it('should be equal ', function(){
      var word1 = 'ahoj';
      var word2 = 'ahoj';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 0 );
    });


    it('should be equal ', function(){
      var word1 = 'ahoj /escape/';
      var word2 = 'ahoj';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 0 );
    });


    it('should be equal ', function(){
      var word1 = 'ahoj [escape]';
      var word2 = 'ahoj';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 0 );
    });

    it('should be equal ', function(){
      var word1 = 'Čauko šťžťžťžýč [escape]';
      var word2 = 'cauko stzťžtzyc';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 0 );
    });


    it('should be quite similar ', function(){
      var word1 = 'ahoj [some other text]';
      var word2 = 'ahoj1';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 1 );
    });


    it('should be quite similar ', function(){
      var word1 = 'occure';
      var word2 = 'occurre';
      var distance = Similarity.getDistance(word1, word2);
      expect(distance).toBe( 1 );
    });




  });




});
