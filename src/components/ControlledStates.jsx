/* eslint-disable react/prop-types */
export default function ControlledStates({state, refetch, errorMessage}) {
  if (state === 'isError' || state === 'error') {
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="bg-blue-600 text-white py-2 px-10 rounded-md"
          type="button"
          onClick={() => refetch ()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (state === 'isLoading') {
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-red-600">Loading data...</p>
      </div>
    );
  }
}
