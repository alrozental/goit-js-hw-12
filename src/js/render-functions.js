// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('is-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('is-hidden');
}

export function clearGallery(container) {
  container.innerHTML = '';
}

let lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(imeges, container) {
  const markup = imeges
    .map(
      img => `
       <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="info">
          <p class="info-text"><b>Likes</b> ${img.likes}</p>
          <p class="info-text"><b>Views</b> ${img.views}</p>
          <p class="info-text"><b>Comments</b> ${img.comments}</p>
          <p class="info-text"><b>Downloads</b> ${img.downloads}</p>
        </div>
      </li>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
