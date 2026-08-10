function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mt-8">

      <input
        type="text"
        placeholder="🔍 Search organizations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;