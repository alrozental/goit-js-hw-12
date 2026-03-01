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
    return iziToast.error({ message: 'Sorry...' });
  }

  clearGallery(galleryContainer);
  hideLoadMoreButton();
  showLoader();

  page = 1;

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(data.hits, galleryContainer);

    if (data.totalHits > 15) {
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
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loadMoreBtn.disabled = true;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits, galleryContainer);

    const item = document.querySelector('.gallery-item');
    if (item) {
      const itemHeight = item.getBoundingClientRect().height;

      window.scrollBy({
        top: itemHeight,
        behavior: 'smooth',
      });
    }

    if (page * 15 >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
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
    loadMoreBtn.disabled = false;
  }
});
