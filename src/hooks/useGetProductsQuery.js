import {useQuery} from 'react-query';
import {fetchProducts} from '../services/productsFetchRoutes';

export default function useGetProductsQuery () {
  return useQuery ({
    queryKey: ['getProductsQuery'],
    queryFn: () => fetchProducts (),
  });
}
