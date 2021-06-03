import './css/styles.css';
import cardTmpl from './templates/card-tmpl.hbs';
import debounce from 'lodash.debounce';
import ApiService from './js/api-service.js';
import getRefs from './js/refs.js';
import { createErrorMsg, createInfoMsg } from './js/notifications.js';
import { preloaderShow, preloaderHidden } from './js/loaders';
import { ligthbox } from './js/gallery-ligthbox';

const refs = getRefs();
const imageSearch = new ApiService();

preloaderShow();
window.addEventListener('load', () => {
  setTimeout(function () {
    preloaderHidden();
    refs.preloader.classList.add('is-hidden');
  }, 1000);
});

addObserver(refs.sentinel);

//===== event listeners =====//
refs.search.addEventListener('input', debounce(onInputChange, 500));
refs.search.addEventListener('focusin', onInputFocusin);
refs.search.addEventListener('focusout', onInputFocusout);
refs.gallery.addEventListener('click', onGalleryImageClick);

function onInputChange(e) {
  imageSearch.query = e.target.value;
  clearGalleryMarkup();
  imageSearch.resetPage();
  fetchGalleryImages();
}

function onInputFocusin() {
  refs.overlay.classList.remove('is-hidden');
}

function onInputFocusout() {
  if (!imageSearch.query || imageSearch.query === ' ') {
    refs.overlay.classList.add('is-hidden');
  } else {
    onInputFocusin();
  }
}

function onGalleryImageClick(e) {
  if (!e.target.classList.contains('photo')) {
    return;
  }

  ligthbox.show(() => {
    const ligthboxImage = document.querySelector('.ligthbox-image');
    ligthboxImage.src = e.target.dataset.source;
    ligthboxImage.alt = e.target.alt;
  });
}

//===== fetch =====//
async function fetchGalleryImages() {
  if (!imageSearch.query) {
    return;
  }
  try {
    const images = await imageSearch.fetchImages();
    createGallery(images);
  } catch {
    createErrorMsg();
  }
}

//===== gallery =====//

function makeGalleryMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTmpl(images));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

function createGallery(images) {
  if (images.length === 0) {
    createInfoMsg();
  } else {
    makeGalleryMarkup(images);
  }
}

function addObserver(elem) {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (
        imageSearch.page > 1 &&
        entry.isIntersecting &&
        imageSearch.query !== ' '
      ) {
        fetchGalleryImages();
      }
    });
  };

  const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
  });
  return observer.observe(elem);
}
