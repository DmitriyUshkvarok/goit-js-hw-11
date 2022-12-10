import { Notify } from 'notiflix';
import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import galleryRender from './templates/gallery.hbs';
import './style.css';
import { fetchContent } from './fetch-content';

const refs = {
  searchForm: document.querySelector('.search-form'),
  btnSubmit: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let page = '';
let currentHits = 0;
refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadFunction);

function onSearchSubmit(e) {
  e.preventDefault();
  const inputSearch = e.currentTarget.elements.searchQuery.value;
  page = 1;
  if (!inputSearch) {
    Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  fetchContent(inputSearch).then(showGallery).catch(onError);
}

function showGallery(dataOwner) {
  const markup = galleryRender(dataOwner);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function onError(error) {
  Notify.failure('Oops, there is no country with that name');
  return;
}

// function onResetSearch() {
//   refs.gallery.innerHTML = '';
//   page = 1;
// }

function onLoadFunction(inputSearch) {
  page += 1;
  fetchContent(inputSearch).then(showGallery).catch(onError);
}

Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: true,
  Toolbar: true,

  Image: {
    zoom: false,
    click: true,
    wheel: 'slide',
  },
});
