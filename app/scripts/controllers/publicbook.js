'use strict';


angular.module('webdrilApp')
  .controller('PublicBookCtrl', ['BookService',
    function (BookService) {
    var mv = this;

      mv.displayed = [];

      mv.callServer = function callServer(tableState) {

        mv.isLoading = true;

        var pagination = tableState.pagination;

        var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
        var number = pagination.number || 10;  // Number of entries showed per page.

          BookService.getPage(start, number, tableState).then(function (result) {
            console.log('success');
            mv.displayed = result.data.books;
            tableState.pagination.numberOfPages = Math.ceil(result.data.count/ 20) ;//set the number of pages so the pagination can update
            mv.isLoading = false;
        });
    };


  }]);
