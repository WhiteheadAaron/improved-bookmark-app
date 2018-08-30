'use strict';

/* global */

// eslint-disable-next-line no-unused-vars

const store = (function () {

  const items = [
    {
      title: 'bookmark 1',
      url: 'some url',
      stars: 3,
      description: 'a description',
      id: 1,
      expanded: false
    },
    {
      title: 'bookmark 2',
      url: 'another url',
      stars: 4,
      description: 'another description',
      id: 2,
      expanded: false
    }
  ];

  const test = function () {
    console.log('store');
  };




  return {
    test,
    items
  };

}());