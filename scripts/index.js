'use strict';

/* global store api item bookmarkList */

// eslint-disable-next-line no-unused-vars

$(document).ready(function () {
  
  bookmarkList.handleNewBookmarkClicked();
  bookmarkList.handleNewBookmarkSubmit();
  bookmarkList.handleClicks();
  bookmarkList.render();

});