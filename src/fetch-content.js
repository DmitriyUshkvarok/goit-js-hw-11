import axios from 'axios';

const KEY = '31956588-280bf1dd69e9c5d9dc2771053';
const URL = 'https://pixabay.com/api/';

export async function fetchContent(inputSearch, page) {
  const FILTER = `?key=${KEY}&q=${inputSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios.get(`${URL}${FILTER}`).then(response => response.data);
}
