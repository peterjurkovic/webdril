'use strict';


angular.module('webdrilApp')
  .controller('PublicBookCtrl', ['BookService',
    function (BookService) {
      console.log('PublicBookCtrl');

      var mv = this;

      mv.items = [];
      mv.loadBooks = function () {
          console.log('Loading books..');
          mv.isLoading = true;
          BookService.getPage(0, 20).then(function (result) {
          console.log('success');
          mv.items = result.books;
          mv.isLoading = false;
        });
    }
      mv.loadBooks();
}]);
