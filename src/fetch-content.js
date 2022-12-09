import axios from 'axios';

const KEY = '31956588-280bf1dd69e9c5d9dc2771053';
const URL = 'https://pixabay.com/api/';

export async function fetchContent(inputSearch) {
  return await axios
    .get(
      `${URL}${KEY}${inputSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    )
    .then(response => response.data);
}
