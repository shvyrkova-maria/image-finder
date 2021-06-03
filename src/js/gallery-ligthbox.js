import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export const ligthbox = basicLightbox.create(
  ` <img class="ligthbox-image" src="" alt="" />
    `,
  {
    closable: true,
  },
);
