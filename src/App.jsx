// import {Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import Products from './pages/Products';

const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-1 h-screen w-screen items-center justify-center text-lg">
        <Products />
      </div>
    </QueryClientProvider>
  );
}

export default App;
