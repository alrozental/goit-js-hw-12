import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `54799522-83001b78b1b469e44ac3f4ab2`;

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
