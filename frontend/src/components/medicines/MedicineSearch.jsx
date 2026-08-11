import { Search } from "lucide-react";

function MedicineSearch({ searchTerm, setSearchTerm }) {

    return (

        <div className="mb-6">

            <div className="relative">

                <Search
                    className="absolute left-4 top-3.5 text-gray-400"
                    size={18}
                />

                <input
                    type="text"
                    placeholder="Search medicine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

        </div>

    );

}

export default MedicineSearch;