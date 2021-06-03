export default function getRefs() {
  return {
    preloader: document.querySelector('.preloader'),
    search: document.querySelector('#search-form'),
    gallery: document.querySelector('.js-gallery'),
    sentinel: document.querySelector('#sentinel'),
    overlay: document.querySelector('.overlay'),
  };
}
