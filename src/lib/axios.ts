import Axios from 'axios';
import { BASE_URL } from '../shared/constants';

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
