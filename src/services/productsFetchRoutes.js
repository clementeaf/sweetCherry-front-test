import axios from 'axios';
import {
  GET_MOCK_PRODUCTS_API_V1,
  GET_PRODUCTS_API_V1,
  TEST_ROUTE,
} from './endPoints';
import {commonConfig} from '../config';

export async function fetchTestRoute () {
  try {
    return await axios.get (TEST_ROUTE, commonConfig);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error ('Resource not found');
    } else if (error.response && error.response.status === 500) {
      throw new Error ('Internal server error');
    } else {
      throw error;
    }
  }
}

export async function fetchProducts () {
  try {
    return await axios.get (GET_PRODUCTS_API_V1, commonConfig);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error ('Resource not found');
    } else if (error.response && error.response.status === 500) {
      throw new Error ('Internal server error');
    } else {
      throw error;
    }
  }
}

export async function fetchMockProducts () {
  try {
    return await axios.get (GET_MOCK_PRODUCTS_API_V1, commonConfig);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error ('Resource not found');
    } else if (error.response && error.response.status === 500) {
      throw new Error ('Internal server error');
    } else {
      throw error;
    }
  }
}
