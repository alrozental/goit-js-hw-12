import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `54799522-83001b78b1b469e44ac3f4ab2`;

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(res => res.data)
    .catch(error => {
      console.log('Error fetching data:', error);
      throw error;
    });
}
