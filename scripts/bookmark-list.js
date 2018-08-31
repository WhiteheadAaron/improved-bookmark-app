'use strict';

/* global store api*/

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function () {

  const newBookmarkForm = `<form class="new-form">
  <input type="text" name="new-item-name" class="new-item-name" placeholder="Bookmark Name Here!" />
  <input type="text" name="new-item-url" class="new-item-url" placeholder="Paste URL Here!" />
  <textarea name="new-item-description" rows="5" cols="30" placeholder="Describe your Bookmark here!" class="new-item-description"></textarea>
  <div class="radio-buttons" >
    <label for="title" class="radio-title">How do you rate this out of 5?</label>

    <label for="one" class="label">1</label>
    <input type="radio" name="rating" value="1" class="radio-button">

    <label for="two" class="label">2</label>
    <input type="radio" name="rating" value="2" class="radio-button">

    <label for="three" class="label">3</label>
    <input type="radio" name="rating" value="3" class="radio-button">

    <label for="four" class="label">4</label>
    <input type="radio" name="rating" value="4" class="radio-button">

    <label for="five" class="label">5</label>
    <input type="radio" name="rating" value="5" class="radio-button">

  </div>
  <input type="submit" class="new-bookmark-button">
</form>`;

  const restoreNewButton = '<button name="subject" type="submit" class="show-new-item-box">New Bookmark</button>';




  function serverError(error) {
    let message = '';
    if (error.responseJSON && error.responseJSON.message) {
      message = error.responseJSON.message;
    } else {
      message = `${error.code}: Server Error`;
    }

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }


  function generateItemHtml(item) {

    let ratingHtml = `<div class="rating">
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
  </div>`;
    if (item.expanded) {
      if (item.rating === 1) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 2) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 3) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 4) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 5) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
      </div>`;
      }
      return `<li class="container" data-item-id="${item.id}">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
          <p class="description">${item.desc}</p>
        </div>
        ${ratingHtml}
        <div class="links">
          <a href="${item.url}" target="_blank" class="link">View Bookmark</a>
        </div>
        <button name="reduce-button" type="submit" class="change-button">- Less</button>
        <button name="edit-button" type="submit" class="edit-button">Edit</button>
        <button class="delete-button" type="submit" name="delete-button">Delete</button>
        </div>
      </div>
    </li>`;
    }
    if (!item.expanded) {
      if (item.rating === 5) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
      </div>`;
      }
      if (item.rating === 2) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 3) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 4) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      if (item.rating === 1) {
        ratingHtml = `<div class="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>`;
      }
      return `<li class="container" data-item-id="${item.id}">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
        </div>
        ${ratingHtml}
        <button name="expand-button" type="submit" class="change-button">+ More</button>
   
      </div>
    </li>`;

    }
  }

  function render() {


    if (store.error) {
      const someError = serverError(store.error);
      $('.error-container').html(someError);
    } else {
      $('.error-container').empty();
    }

    let items = store.items;

    if (store.filterValue === 2) {
      items = store.items.filter(item => item.rating > 1);
    }

    if (store.filterValue === 3) {
      items = store.items.filter(item => item.rating > 2);
    }

    if (store.filterValue === 4) {
      items = store.items.filter(item => item.rating > 3);
    }

    if (store.filterValue === 5) {
      items = store.items.filter(item => item.rating === 5);
    }



    const bookmarksString = generateString(items);
    $('.stored-bookmarks').html(bookmarksString);

  }

  function generateString(bookmarks) {
    const items = bookmarks.map((item) => generateItemHtml(item));
    return items.join('');
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.container')
      .data('item-id');
  }

  const handleNewBookmarkClicked = function () {
    $('.new-box').on('click', '.show-new-item-box', event => {
      $('.new-box').html(newBookmarkForm);
    });
  };

  function handleNewBookmarkSubmit() {
    $('.new-box').on('submit', '.new-form', function (event) {
      event.preventDefault();

      let bookmarkName = $('.new-item-name').val();
      let bookmarkURL = $('.new-item-url').val();
      let bookmarkDescription = $('.new-item-description').val();
      let bookmarkRating = $('input[name="rating"]:checked').val();
      let bookmarkRatingNumber = parseInt(bookmarkRating);

      let newObj = {
        title: bookmarkName,
        url: bookmarkURL,
        desc: bookmarkDescription,
        rating: bookmarkRatingNumber
      };

      api.createItem(newObj, (newItemToStore) => {
        store.addItem(newItemToStore);
        render();
      },
      (error) => {
        console.log(error);
        store.setError(error);
        render();
      });




      $('.new-box').html(restoreNewButton);




    });
  }

  function handleDropDownFilter() {
    $('.filter-items-submit').on('click', function (event) {

      event.preventDefault();

      let dropMenu = document.getElementById('drop-down-menu');
      var dropMenuValue = dropMenu.options[dropMenu.selectedIndex].value;
      store.filterValue = parseInt(dropMenuValue);

      render();
    });
  }

  const handleChangeBookmark = function () {
    $('.stored-bookmarks').on('click', '.change-button', event => {

      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      item.expanded = !item.expanded;


      render();

    });
  };

  function handleDeleteBookmark() {
    $('.stored-bookmarks').on('click', '.delete-button', event => {
      const id = getItemIdFromElement(event.currentTarget);

      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });


    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  }



  function handleClicks() {
    handleNewBookmarkClicked();
    handleNewBookmarkSubmit();
    handleDropDownFilter();
    handleChangeBookmark();
    handleDeleteBookmark();
    handleCloseError();
  }

  return {
    render,
    handleClicks,
  };

}());