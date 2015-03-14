'use strict';

angular.module('webdrilApp')
  .filter('drilDate', ['$filter', function($filter) {

    function equals(date1, date2){
      return date1.toDateString() === date2.toDateString();
    }

    var today = new Date(),
      yesterday = new Date(new Date().setDate(new Date().getDate()-1));

    return function(timestamp) {
      if(angular.isNumber(timestamp)){
        var date = new Date(timestamp * 1000);

        if(equals(date, today)){
          return 'today';
        } else if(equals(date, yesterday)){
          return 'yesterday';
        }
        return $filter('date')(date, 'dd.MM.yyyy');
      }
      return '';
    };
  }]);
