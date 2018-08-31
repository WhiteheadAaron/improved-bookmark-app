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
      success: function (data) {
        callback(data);
      }
    });
  };

  const createItem = function (name, callback) {

    let newObj = name;
    console.log(newObj);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newObj),
      success: function (data) {
        console.log('success!');
        callback(data);
      }
    });
  };




  return {
    getItems,
    deleteItem,
    createItem
  };

}());