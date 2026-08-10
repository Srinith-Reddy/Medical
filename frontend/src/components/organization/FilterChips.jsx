const filters = [
  "All",
  "Hospital",
  "Clinic",
  "Laboratory",
  "Pharmacy",
];

function FilterChips({ selectedFilter, setSelectedFilter }) {
  return (
    <div className="flex gap-3 mt-6 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          className={`px-5 py-2 rounded-full transition font-medium ${
            selectedFilter === filter
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterChips;