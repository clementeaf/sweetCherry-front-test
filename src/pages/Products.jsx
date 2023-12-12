/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {DataGrid} from '@mui/x-data-grid';
import useGetProductsQuery from '../hooks/useGetProductsQuery';
import {columns} from '../components/columns';
import ControlledStates from '../components/ControlledStates';
import {useState} from 'react';

export default function ViewProducts () {
  const {isLoading, isError, data, refetch} = useGetProductsQuery ();
  const [searchTerm, setSearchTerm] = useState ('');

  const rows = (data && data.data) || [];

  const filteredRows = rows.filter (
    product =>
      product.title.toLowerCase ().includes (searchTerm.toLowerCase ()) ||
      product.price.toString ().includes (searchTerm.toLowerCase ())
  );

  return (
    <div className="flex">
      {isError
        ? <ControlledStates
            content={
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-red-600">Error while loading data.</p>
                <button
                  className="bg-blue-600 text-white py-2 px-10 rounded-md"
                  type="button"
                  onClick={() => refetch ()}
                >
                  Retry
                </button>
              </div>
            }
          />
        : isLoading
            ? <ControlledStates content="Loading data..." />
            : <ControlledStates
                content={
                  <div>
                    <div className="m-4">
                      <label htmlFor="searchInput" className="mr-2">
                        Search:
                      </label>
                      <input
                        type="text"
                        id="searchInput"
                        value={searchTerm}
                        onChange={e => setSearchTerm (e.target.value)}
                      />
                    </div>
                    <DataGrid
                      rows={searchTerm ? filteredRows : rows}
                      columns={columns}
                      getRowId={row => row.id}
                      initialState={{
                        pagination: {
                          paginationModel: {page: 0, pageSize: 5},
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                    />
                  </div>
                }
              />}
    </div>
  );
}
