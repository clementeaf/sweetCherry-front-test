import {useQuery} from 'react-query';
import {fetchMockProducts} from '../services/productsFetchRoutes';

export default function useGetMockProductsQuery () {
  return useQuery ({
    queryKey: ['getMockProducts'],
    queryFn: () => fetchMockProducts (),
  });
}
