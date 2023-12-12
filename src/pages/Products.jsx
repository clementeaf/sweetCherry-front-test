/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import useGetProductsQuery from '../hooks/useGetProductsQuery';
import ControlledStates from '../components/ControlledStates';
import {columns} from '../components/columns';
import CustomFilter from '../components/CustomFilter';

export default function ViewProducts () {
  const {isLoading, isError, data, refetch} = useGetProductsQuery ();
  const [searchTerm, setSearchTerm] = useState ('');
  const [filteredRows, setFilteredRows] = useState ([]);
  const [isFiltered, setIsFiltered] = useState (false);
  const rows = (data && data.data) || [];

  const handleFilter = () => {
    const searchTermLowerCase = searchTerm.toLowerCase ();

    const filteredData = rows.filter (product => {
      const titleMatches =
        !isNaN (searchTerm) &&
        product.price.toString ().includes (searchTermLowerCase);
      const priceMatches =
        isNaN (searchTerm) &&
        product.title.toLowerCase ().includes (searchTermLowerCase);

      return titleMatches || priceMatches;
    });

    setFilteredRows (filteredData);
    setIsFiltered (true);
  };

  const handleClear = () => {
    setFilteredRows ([]);
    setSearchTerm ('');
    setIsFiltered (false);
  };

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
                    <CustomFilter
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      handleFilter={handleFilter}
                      isFiltered={isFiltered}
                      handleClear={handleClear}
                    />
                    <DataGrid
                      rows={isFiltered ? filteredRows : rows}
                      columns={columns}
                      getRowId={row => row.id}
                      checkboxSelection
                      initialState={{
                        ...data.initialState,
                        pagination: {paginationModel: {pageSize: 5}},
                      }}
                      pageSizeOptions={[5, 10, 25]}
                    />
                  </div>
                }
              />}
    </div>
  );
}
