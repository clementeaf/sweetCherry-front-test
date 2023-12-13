import axios from 'axios';
import {GET_PRODUCTS_API_V1} from './endPoints';
import {commonConfig} from '../config';

export async function fetchProducts () {
  try {
    return await axios.get (GET_PRODUCTS_API_V1, commonConfig);
  } catch (error) {
    if (error.response) {
      const {status, data} = error.response;
      if (status === 404) {
        throw new Error ('Resource not found');
      } else if (status === 500) {
        throw new Error ('Internal server error');
      } else {
        throw new Error (data.message || 'Unknown error');
      }
    } else {
      throw new Error ('Network error');
    }
  }
}
