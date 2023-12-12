/* eslint-disable react/prop-types */
import {CiFilter} from 'react-icons/ci';

export default function CustomFilter({
  searchTerm,
  setSearchTerm,
  isFiltered,
  handleFilter,
  handleClear,
}) {
  return (
    <div className="flex mb-4 items-end border border-black/20 px-6 py-2 rounded-md">
      <label htmlFor="searchInput" className="mr-2">
        Filter by Price or Name:
      </label>
      <div className="flex items-end">
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          className="px-2 focus:outline-none"
          placeholder="Enter a value to filter"
          onChange={e => setSearchTerm (e.target.value)}
        />
        <button
          type="button"
          className="flex border-l border-black/50 px-4 py-1 items-center gap-2 text-base"
          onClick={isFiltered ? handleClear : handleFilter}
        >
          <CiFilter />
          {isFiltered ? 'Clear' : 'Filter'}
        </button>
      </div>
    </div>
  );
}
