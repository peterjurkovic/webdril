'use strict';


angular.module('webdrilApp')
  .factory('Similarity', function(){

    var cached = null;

    var cleanUp = function ( text ){
      if(typeof text !== 'string' ){
        return '';
      }
      text = text.speechEscape();
      var from = 'àôďḟëšơßăřțňāķŝỳņĺħṗóúěéçẁċõṡøģŧșėĉśîűćęŵṫūčöèŷąłųůşğļƒžẃḃåìïḋťŗäíŕêüòēñńĥĝđĵÿũŭưţýőâľẅżīãġṁōĩùįźáûþðæµĕı',
        to =   'aodfesosartnaksynlhpoueecwcosogtsecsiucewtucoeyaluusglfzwbaiidtraireuoennhgdjyuuutyoalwziagmoiuizautdauei',
        length = text.length,
        position,
        result = '',
        i;

      text = text.toLowerCase();
      for(i = 0; i < length; i++){
        position = from.indexOf(text[i]);
        if(position > -1){
          result += to.charAt(position);
        } else{
          result += text[i];
        }
      }
      return result
        .replace(/ +?/g, '-')
        .replace(/[^\w\s]|(.)\1/gi, '-')
        .replace(/[\-]{2,}/g, '-');
    }

    var compare = function (a , b) {

      function mnmt(x, y, z) {
        if (x < y && x < z) return x;
        if (y < x && y < z) return y;
        return z;
      }
      if (a === b) {
        return 0;
      }

      var cost,
          m = a.length,
          n = b.length;

      // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
      if (m < n) {
        var c = a; a = b; b = c;
        var o = m; m = n; n = o;
      }

      var r = []; r[0] = [];
      for (var c = 0; c < n + 1; ++c) {
        r[0][c] = c;
      }

      for (var i = 1; i < m + 1; ++i) {
        r[i] = []; r[i][0] = i;
        for ( var j = 1; j < n + 1; ++j ) {
          cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
          r[i][j] = mnmt( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
        }
      }
      var rl = r.length;
      return r[ rl - 1 ][ r[ rl - 1 ].length - 1 ];
    };

    var getDistance = function(word, userInput){
      userInput = cleanUp(userInput);
      if(cached !== word){
        cached = cleanUp(word);
      }
      return compare(cached, userInput);
    };



    return {
      getDistance : getDistance
    };
  });
