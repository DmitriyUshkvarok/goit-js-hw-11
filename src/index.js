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
};

refs.btnSubmit.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();
  const inputSearch = e.currentTarget.srcElement.searchQuery.value;
  console.dir(inputSearch);
  fetchContent(inputSearch).then(img => {
    if (!inputSearch) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
  });
}
