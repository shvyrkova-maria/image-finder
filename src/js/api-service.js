import axios from 'axios';

const API_KEY = '21768935-3fedd5c602a3f7ac5e18d4c15';
axios.defaults.baseURL = `https://pixabay.com/api`;

export default class ApiService {
  constructor() {
    this.searchQuery = ' ';
    this.page = 1;
  }

  async fetchImages() {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`,
    );
    this.addPage();
    return await response.data.hits;
  }

  addPage() {
    return (this.page += 1);
  }

  resetPage() {
    return (this.page = 1);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSerchQuery) {
    return (this.searchQuery = newSerchQuery);
  }
}

//===== FETCH

// fetchImages() {
//   const BASE_URL = 'https://pixabay.com/api';
//   const API_KEY = '21768935-3fedd5c602a3f7ac5e18d4c15';
//   const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;
//   return fetch(url)
//     .then(response => {
//       return response.json();
//     })
//     .then(({ hits }) => {
//       this.addPage();
//       return hits;
//     });
// }

//===== AXIOS

// fetchImages() {
//   return axios
//     .get(
//       `/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`,
//     )
//     .then(response => {
//       this.addPage();
//       return response.data.hits;
//     });
// }

//===== AXIOS asyns...await

// async fetchImages() {
//   const response = await axios
//     .get(
//       `/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`,
//     );
//   this.addPage();
//   return await response.data.hits;
// }
