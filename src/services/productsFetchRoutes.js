import axios from 'axios';
import {GET_PRODUCTS_API_V1, TEST_ROUTE} from './endPoints';
import {commonConfig} from '../config';

export async function fetchTestRoute () {
  try {
    return await axios.get (TEST_ROUTE, commonConfig);
  } catch (error) {
    return error;
  }
}

export async function fetchProducts () {
  try {
    return await axios.get (GET_PRODUCTS_API_V1, commonConfig);
  } catch (error) {
    return error;
  }
}
