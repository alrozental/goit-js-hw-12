import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-btn');

let page = 1;
let query = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();

  if (query === '') {
    return iziToast.error({
      title: 'Error',
      message: 'Sorry, you need to enter a request!',
      position: 'topRight',
    });
  }

  clearGallery(galleryContainer);
  hideLoadMoreButton();
  showLoader();

  page = 1;

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits, galleryContainer);

    if (data.totalHits > 15) {
      showLoadMoreButton();
    } else if (data.totalHits > 0) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;

  loadMoreBtn.disabled = true;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits, galleryContainer);

    const item = document.querySelector('.gallery-item');
    if (item) {
      const itemHeight = item.getBoundingClientRect().height;

      window.scrollBy({
        left: 0,
        top: itemHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
  }
});
