import { Notify } from 'notiflix';

Notify.init({
  width: '280px',
  distance: '20px',
  timeout: 5000,
  clickToClose: true,
  fontSize: '16px',
  fontFamily: 'Roboto',

  info: {
    background: '#d4c718b6',
    textColor: '#fff',
    childClassName: 'info',
    notiflixIconColor: '#fff',
  },

  failure: {
    background: '#c41c1c',
    childClassName: 'failure',
    notiflixIconColor: '#fff',
  },
});

export const createErrorMsg = function () {
  Notify.failure('Error. Please try again later');
};

export const createInfoMsg = function () {
  Notify.info('No matches. Please try again');
};
