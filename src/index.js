import { Notify } from 'notiflix';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import galleryRender from './templates/gallery.hbs';
import './style.css';
import { fetchContent } from './fetch-content';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// links
const refs = {
  searchForm: document.querySelector('.search-form'),
  btnSubmit: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
let page = '';

// events
refs.searchForm.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadFunction);

// function submit form
function onSearchSubmit(e) {
  e.preventDefault();
  onResetSearch();
  const inputSearch = e.currentTarget.elements.searchQuery.value;
  page = 1;
  if (!inputSearch) {
    refs.loadMoreBtn.classList.remove('is-hidden');
    return Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  response = fetchContent(inputSearch, page).then(showGallery).catch(onError);
}

// function show img content
function showGallery(dataOwner) {
  const markup = galleryRender(dataOwner);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  scrollSmooth();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.gallery.classList.add('show');

  if (page === 1) {
    Notify.success(`Hooray! We found ${dataOwner.totalHits} images.`);
  }

  if (dataOwner.totalHits < 40) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  }

  if (dataOwner.totalHits === 0) {
    refs.gallery.classList.remove('show');
    refs.loadMoreBtn.classList.remove('is-hidden');
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

// function error
function onError(error) {
  refs.loadMoreBtn.classList.remove('is-hidden');
  return Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
  return;
}

// function reset gallery
function onResetSearch(page) {
  page = 1;
  refs.gallery.innerHTML = '';
  refs.gallery.classList.remove('show');
}

// function load img
function onLoadFunction() {
  const inputSearch = refs.searchForm.elements.searchQuery.value;
  page += 1;

  fetchContent(inputSearch, page).then(showGallery).catch(onError);
}

// delete text in search array when btn is click backspace
window.addEventListener('keydown', onBackspaceDeleted);

function onBackspaceDeleted(e) {
  if (e.code === 'Backspace') {
    refs.searchForm.elements.searchQuery.value = '';
  }
  console.dir(e);
}

// smooth scroll

function scrollSmooth() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 4,
    behavior: 'smooth',
  });
}

// fancybox  plugin
Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: true,
  Toolbar: true,
  captions: true,

  Image: {
    zoom: false,
    click: true,
    wheel: 'slide',
  },
});
