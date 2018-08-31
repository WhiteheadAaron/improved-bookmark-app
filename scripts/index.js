'use strict';

/* global store api item bookmarkList */

// eslint-disable-next-line no-unused-vars

$(document).ready(function () {

  bookmarkList.render();
  bookmarkList.handleClicks();


  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });

});