'use strict';

/* global store*/

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function () {

  const newBookmarkForm = `<form class="new-form">
  <input type="text" name="new-item-name" class="new-item-name" placeholder="Bookmark Name Here!" />
  <input type="text" name="new-item-url" class="new-item-url" placeholder="Paste URL Here!" />
  <textarea name="new-item-description" rows="5" cols="30" placeholder="Describe your Bookmark here!" class="new-item-description"></textarea>
  <div class="radio-buttons">
    <label for="title" class="radio-title">How do you rate this out of 5?</label>

    <label for="one" class="label">1</label>
    <input type="radio" name="stars" value="1" class="radio-button">

    <label for="two" class="label">2</label>
    <input type="radio" name="stars" value="2" class="radio-button">

    <label for="three" class="label">3</label>
    <input type="radio" name="stars" value="3" class="radio-button">

    <label for="four" class="label">4</label>
    <input type="radio" name="stars" value="4" class="radio-button">

    <label for="five" class="label">5</label>
    <input type="radio" name="stars" value="5" class="radio-button">

  </div>
  <input type="submit" class="new-bookmark-button">
</form>`;

  const restoreNewButton = '<button name="subject" type="submit" class="show-new-item-box">New Bookmark</button>';

  const unexpandedHTML = function () {
    return `<div id="container1">
    <div class="row2 bookmark-item">
  <div class="name-description-box">
    <h2 class="bookmark-name">Bookmark 2</h2>
  </div>
  <div class="stars">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
  </div>
  <form class="expand-form">
  <button name="expand" type="submit" class="expand-bookmark">See More!</button>
  </form>
  </div>
  </div>`;
  };



  function generateItemHtml(item) {
    let starsHtml = `<div class="stars">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
  </div>`;
    if (item.expanded) {
      if (item.stars === 1) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 2) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 3) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 4) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      return `<li class="container">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
          <p class="description">${item.description}</p>
        </div>
        ${starsHtml}
        <div class="links">
          <a href="${item.url}" target="_blank" class="link">View Bookmark</a>
        </div>
        <div class="delete">
            <form class="reduce-form">
                <input type="submit" class="reduce-form-button">
            </form>
          <button class="delete-item">
            <span>Delete</span>
          </button>
        </div>
      </div>
    </li>`;
    }
    if (!item.expanded) {
      if (item.stars === 1) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 2) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 3) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.stars === 4) {
        starsHtml = `<div class="stars">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      return `<li class="container">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
        </div>
        ${starsHtml}


            <form class="reduce-form">
                <input type="submit" class="reduce-form-button">
            </form>
   
      </div>
    </li>`;

    }
  }


  function render() {
    let items = store.items;
    const bookmarksString = generateString(items);
    $('.stored-bookmarks').html(bookmarksString);
  }

  function generateString(bookmarks) {
    const items = bookmarks.map((item) => generateItemHtml(item));
    return items.join('');
  }


  const handleNewBookmarkClicked = function () {
    $('.show-new-item-box').on('click', event => {
      $('.new-box').html(newBookmarkForm);
      handleClicks();
    });
  };

  function handleNewBookmarkSubmit() {
    $('.new-form').submit(function (event) {
      event.preventDefault();

      let bookmarkName = $('.new-item-name').val();
      let bookmarkURL = $('.new-item-url').val();
      let bookmarkDescription = $('.new-item-description').val();
      let bookmarkRating = $('.radio-buttons').val();
      console.log(bookmarkName);
      console.log(bookmarkURL);
      console.log(bookmarkDescription);




      $('.new-box').html(restoreNewButton);
      handleClicks();
    });
  }

  function handleDropDownFilter() {
    $('.drop-down-filter').submit(function (event) {
      event.preventDefault();
      handleClicks();
    });
  }

  function handleReduceBookmark() {
    $('.reduce-form').submit(function (event) {
      event.preventDefault();



      handleClicks();
    });
  }

  function handleExpandBookmark() {
    $('.expand-form').submit(function (event) {
      event.preventDefault();



      handleClicks();
    });
  }

  function handleClicks() {
    handleNewBookmarkClicked();
    handleNewBookmarkSubmit();
    handleDropDownFilter();
    handleExpandBookmark();
    handleReduceBookmark();
  }

  return {
    render,
    handleNewBookmarkClicked,
    handleNewBookmarkSubmit,
    handleDropDownFilter,
    handleExpandBookmark,
    handleClicks,

  };

}());