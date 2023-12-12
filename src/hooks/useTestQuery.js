import {useQuery} from 'react-query';
import {fetchTestRoute} from '../services/productsFetchRoutes';

export default function useTestQuery () {
  return useQuery ({
    queryKey: ['getTestFetch'],
    queryFn: () => fetchTestRoute (),
  });
}
