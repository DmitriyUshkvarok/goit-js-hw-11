import axios from 'axios';

const KEY = '31956588-280bf1dd69e9c5d9dc2771053';
const URL = 'https://pixabay.com/api/';

export async function fetchContent(inputSearch, page, amountContent) {
  return await axios
    .get(
      `${URL}?key=${KEY}&q=${inputSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${amountContent}`
    )
    .then(response => response.data);
}
