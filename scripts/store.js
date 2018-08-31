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

  const setError = function(error) {
    this.error = error;
  };

  const updateItems = function(id, newObj) {
    let itemToUpdate = this.items.find(item => item.id === id);
    Object.assign(itemToUpdate, newObj);
  };

  return {

    items: [],
    filterValue: 0,
    error: null,
    edited: false,

    addItem,
    findById,
    findAndDelete,
    setError,
    updateItems
  };

}());