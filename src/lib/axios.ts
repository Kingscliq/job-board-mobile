import Axios from 'axios';

export const axios = Axios.create({
  //   baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});
