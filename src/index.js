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
refs.searchForm.addEventListener('submit', onSearchSubmit);

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
  // refs.gallery.innerHTML = galleryRender(dataOwner.hits);
  const markup = dataOwner.map(item => galleryRender(item));
  gallery.insertAdjacentHTML('beforeend', markup);
  // refs.gallery.innerHTML = dataOwner.hits
  //   .map(
  //     ({
  //       webformatURL,
  //       largeImageURL,
  //       tags,
  //       likes,
  //       views,
  //       comments,
  //       downloads,
  //     }) => {
  //       return `<div class="photo-card">
  //         <div class="owerlay">
  //       <a data-fancybox='gallery' href="${largeImageURL}"><img class="gallery-img" width=250 height="100" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  //   </div>
  //   <div class="info">
  //     <p class="info-item">
  //       <b>Likes ${likes}</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Views ${views}</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Comments ${comments}</b>
  //     </p>
  //     <p class="info-item">
  //       <b>Downloads ${downloads}</b>
  //     </p>
  //   </div>
  // </div>`;
  //     }
  //   )
  //   .join('');
}

function onError(error) {
  Notify.failure('Oops, there is no country with that name');
  return;
}

refs.loadMoreBtn.addEventListener('click', onLoadFunction);
function onLoadFunction() {}

Fancybox.bind('[data-fancybox="gallery"]', {
  Thumbs: true,
  Toolbar: true,

  Image: {
    zoom: false,
    click: true,
    wheel: 'slide',
  },
});
