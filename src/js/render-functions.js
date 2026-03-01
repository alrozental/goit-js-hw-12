import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more-container');

let lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMore.classList.add('is-hidden');
}

export function clearGallery(container) {
  container.innerHTML = '';
}

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
