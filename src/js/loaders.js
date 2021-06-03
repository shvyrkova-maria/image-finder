import { Loading } from 'notiflix';

Loading.init({
  fontFamily: 'Roboto',
  svgSize: '100px',
  svgColor: '#d4c818',
  messageFontSize: '18px',
  messageMaxLength: 34,
  messageColor: '#dcdcdc',
});

export const preloaderShow = function () {
  Loading.dots('Please wait...');
};

export const preloaderHidden = function () {
  Loading.remove();
};
