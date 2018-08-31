'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const store = (function () {

  

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  
  const addItem = function(item) {
    this.items.push(item);
  };


  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };



  return {

    items: [],
    filterValue: 0,

    addItem,
    findById,
    findAndDelete
  };

}());