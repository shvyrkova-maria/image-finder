import './css/styles.css';
import cardTmpl from './templates/card-tmpl.hbs';
import debounce from 'lodash.debounce';
import ApiService from './js/api-service.js';
import getRefs from './js/refs.js';

const refs = getRefs();
const imageSearch = new ApiService();

//===== intersection observer
const onEntry = entries => {
  entries.forEach(entry => {
    if (
      imageSearch.page > 1 &&
      entry.isIntersecting &&
      imageSearch.query !== ' '
    ) {
      fetchGalleryImages();
      refreshFsLightbox();
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(refs.sentinel);

//===== event listeners
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

function fetchGalleryImages() {
  if (!imageSearch.query) {
    return;
  }
  imageSearch
    .fetchImages()
    .then(createGallery)
    .catch(err => {
      return console.log(err);
      // createErrorNotice;
    });
}

function onGalleryImageClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('photo')) {
    return;
  }
}

//=====  gallery
function createGallery(images) {
  //   if (images.length === 0) {
  //     return createInfoNotice();
  //   } else {
  makeGalleryMarkup(images);
  //   }
}

function makeGalleryMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', cardTmpl(images));
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}

//=====  notifications
// function createInfoNotice() {
//   infoNotice.open();
// }

// function createErrorNotice() {
//   errorNotice.open();
// }
