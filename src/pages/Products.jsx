/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import ControlledStates from '../components/ControlledStates';
import {columns} from '../components/columns';
import CustomFilter from '../components/CustomFilter';
import useGetProductsQuery from '../hooks/useGetProductsQuery';

export default function ViewProducts () {
  const {isLoading, isError, data, refetch, error} = useGetProductsQuery ();
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
      <ControlledStates
        state={isError ? 'error' : isLoading ? 'isLoading' : null}
        refetch={refetch}
        errorMessage={
          isError ? (error ? error.message : 'Error') : 'Error Network'
        }
      />
      {!isLoading &&
        !isError &&
        <div className="flex flex-col w-full">
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
        </div>}
    </div>
  );
}
