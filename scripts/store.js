'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const store = (function () {

  

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const test = function () {
    console.log('store');
  };




  return {

    items: [],
    filterValue: 0,

    test,
    findById
  };

}());