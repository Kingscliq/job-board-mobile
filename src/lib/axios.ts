import Axios from 'axios';
import { BASE_URL } from '../shared/constants';

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Token b1dc0de988af0decc35f217add5f669c2c6be953',
    Accept: 'application/json',
  },
});
