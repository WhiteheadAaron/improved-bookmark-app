'use strict';

/* global store api*/

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function () {

  const newBookmarkForm = `<form class="new-form">
  <input type="text" name="new-item-name" class="new-item-name" placeholder="Bookmark Name Here!" />
  <input type="text" name="new-item-url" class="new-item-url" placeholder="Paste URL Here!" />
  <textarea name="new-item-description" rows="5" cols="30" placeholder="Describe your Bookmark here! (Optional)" class="new-item-description"></textarea>
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


    let ratingHtml = '<div class="rating">No rating</div>';
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


    const radioButtons = [1, 2, 3, 4, 5].map(num => {
      if (num === item.rating) {
        return `<input type="radio" class="radio-button" name="rating" value="${num}" checked>`;
      }

      return `<input type="radio" class="radio-button" name="rating" value="${num}">`;
    });

    const radioLabels = [1, 2, 3, 4, 5].map(num => {
      return `<label for="${num}" class="label" >${num}</label>`;
    });

    const finalRadioLabels = radioLabels.toString().replace(/,/g, '');
    const finalRadioButtons = radioButtons.toString().replace(/,/g, '');


    let editButtonHtml = `<li class="container" data-item-id="${item.id}">
  <div class="row2" bookmark-item">
    <div class="name-description-box">
    <form class="edit-form">
      <label for="bookmark-title" class="edit-title-label">Title</label>
      <input class="edit-bookmark-title" type="text" value="${item.title}" /><br>
      <label for="bookmark-desc" class="edit-desc-label">Description</label>
      <input class="edit-bookmark-desc" type="text" value="${item.desc}" /><br>
      <div class="edit-radio-buttons">
      <label for="title" class="radio-title">How do you rate this out of 5?</label>
      ${finalRadioLabels}<br>
      ${finalRadioButtons}
      </div>
      <div class="links">
      <label for="bookmark-url" class="edit-url-label">URL</label>
      <input class="edit-bookmark-url" type="text" value="${item.url}" />
      </div>
      <input type="submit" class="submit-edit-button">
    </form>
    <button class="delete-button" type="submit" name="delete-button">Delete</button>
    </div>
  </div>
</li>`;

    if (!item.edited) {
      editButtonHtml = `<li class="container" data-item-id="${item.id}">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
          <p class="description">${item.desc}</p>
        </div>
        ${ratingHtml}
        <div class="links">
          <a href="${item.url}" target="_blank" class="link">View Bookmark</a>
        </div>
        <button name="reduce-button" type="submit" class="change-button">Less</button>
        <button name="edit-button" type="submit" class="edit-button">Edit</button>
        <button class="delete-button" type="submit" name="delete-button">Delete</button>
        </div>
      </div>
    </li>`;
    }


    if (item.expanded) {

      return `${editButtonHtml}`;
    }
    if (!item.expanded) {

      return `<li class="container" data-item-id="${item.id}">
      <div class="row2 bookmark-item">
        <div class="name-description-box">
          <h2 class="bookmark-name">${item.title}</h2>
        </div>
        ${ratingHtml}
        <button name="expand-button" type="submit" class="change-button">More</button>
   
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
      }, (error) => {
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

  function handleDeleteAllClicked() {
    $('.delete-all').on('click', event => {
      event.preventDefault();
      let result = confirm('Are you sure?');
      if (result) {
        for (let i = 0; i < store.items.length; i++) {
          // console.log(store.items[0].id);
          api.deleteItem(store.items[i].id, () => {
            store.findAndDelete([i].id);
            store.items = [];
            render();
          });
        }

      }
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  }

  function handleEditBookmark() {
    $('.stored-bookmarks').on('click', '.edit-button', (event) => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);

      item.edited = !item.edited;
      render();
    });
  }

  function handleEditSubmit() {
    $('.stored-bookmarks').on('submit', '.edit-form', (event) => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);

      let newTitle = $('.edit-bookmark-title').val();
      let newURL = $('.edit-bookmark-url').val();
      let newDesc = $('.edit-bookmark-desc').val();
      let newRating = parseInt($('input[name="rating"]:checked').val());
      let newObj = {
        title: newTitle,
        url: newURL,
        desc: newDesc,
        rating: newRating
      };


      api.editItem(id, newObj, () => {
        console.log('hello');
        store.updateItems(id, newObj);
        render();
      }, (error) => {
        store.setError(error);
        render();
      });


      item.edited = !item.edited;
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
    handleEditBookmark();
    handleEditSubmit();
    handleDeleteAllClicked();
  }

  return {
    render,
    handleClicks,
  };

}());