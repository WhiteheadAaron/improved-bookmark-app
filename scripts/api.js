'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const api = (function () {


  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/aaron';

  const getItems = function (callback) {

    $.getJSON(`${BASE_URL}/bookmarks`, (response) => {
      callback(response);
    });
  };

  const deleteItem = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    });
  };

  const createItem = function (name, callback, error) {

    let newObj = name;

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newObj),
      success: callback,
      error: error,

    });
  };

  const editItem = function (id, newData, success, error) {
    console.log(newData);
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(newData),
      success: success,
      error: error
    });
  };




  return {
    getItems,
    deleteItem,
    createItem,
    editItem
  };

}());