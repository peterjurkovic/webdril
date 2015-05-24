'use strict';


angular.module('webdrilApp')
  .factory('DrilStrategy', [ 'RATING', function (RATING) {



    var sort = {

      by : function (attrName, a, b){
        if(a[attrName] === null && b[attrName] === null){
          return 0;
        }
        if(a[attrName] !== null && b[attrName] === null){
          return -1;
        }
        if(a[attrName] === null && b[attrName] !== null){
          return 1;
        }
        return b[attrName] - a[attrName];
      },

      byIsLearned : function(a, b){
        if(a.isLearned && !b.isLearned){
          return 1;
        }
        if(!a.isLearned && b.isLearned){
          return -1;
        }
        return 0;
      },


      byLastView : function (a, b) {
        return sort.by('lastViewed', a, b);
      },


      byLastRating : function (a, b) {
        var learned = sort.byIsLearned(a,b);
        if(learned === 0){
          var result = sort.by('lastRating', a, b);
          return result === 0 ? sort.byLastView(a, b) : result;
        }
        return learned;
      },


      byHitsAndRating : function (a, b) {

        function toRating(rating){
          return rating === null ? RATING.NOT_YET : rating;
        }

        function toHits(viewed){
          return viewed === null ? 1 : viewed;
        }
        var learned = sort.byIsLearned(a,b);
        if(learned !== 0){
          return learned;
        }
        var aRating = toRating(a.lastRating),
            bRating = toRating(b.lastRating),
            aViewed = toHits(a.viewed),
            bViewed = toHits(b.viewed),
            aLearned = a.isLearned ? -1 : 0,
            bLearned = b.isLearned ? -1 : 0;

        return (bRating + bViewed + bLearned) - (aRating + aViewed + aLearned);
       }


      };

      var strategies = {


        /**
         * Returns the latest rated word
         *
         * Function select the latest word (in terms of time) which has user shown.
         * In case given word was never shown (lastViews is null), is selected the first
         * word from collection which has lastViews attribute null.
         *
         * @param list
         * @returns word - or null in case is collection empty
         */
          selectLatest : function (list){
            var now = new Date().getTime(),
              index = -1;
            for(var i = 0, max = list.length; i < max; i++){
              if(list[i].lastViewed === null){
                return list[i];
              }
              if(now > list[i].lastViewed ){
                now = list[i].lastViewed;
                index = i;
              }
            }
            if(index > -1){
              return list[index];
            }
            return null;
          },


        /**
         * Selects one of the the worst rated words
         *
         * In case if is count of words in given list lower 8, will be used "selectLatest" strategy.
         * Otherwise will be returned the worst rated and the last rated word.
         * The three latest rated words is excluded from computation.
         *
         * @param list
         * @returns {*}
         */
        selectWorstRated : function ( list ){
          if(list.length < 8){
            return strategies.selectLatest( list );
          }
          list.sort(sort.byLastView);
          list.splice(0, 3);
          list.sort(sort.byLastRating);
          return list[0];
        },

        /**
         * Selects the most problematic word
         *
         * In case is count of words in given list lower than 10, will be used "selectWorstRated" strateg.
         * Otherwise, select the word which was shown the most times multiplied with lastRating.
         * The 4th latest rated words is excluded from computation.
         *
         * @param list
         * @returns {*}
         */
        selectMostProblematic : function ( list ){
          if(list.length < 10){
            return strategies.selectWorstRated( list );
          }
          list.sort(sort.byLastView);
          list.splice(0, 4);
          list.sort(sort.byHitsAndRating);
          return list[0];
        }
      };

      return strategies;
    }]);
