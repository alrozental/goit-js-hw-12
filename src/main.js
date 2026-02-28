// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
// import { clearGallery } from './js/render-functions.js';
// import { showLoader } from './js/render-functions.js';
// import { hideLoader } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('input');
const galleryContainer = document.querySelector('.gallery');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = input.value.trim();

  if (query === '') {
    return iziToast.error({ message: 'Sorry...' });
  }

  clearGallery(galleryContainer);
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      createGallery(data.hits, galleryContainer);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});
