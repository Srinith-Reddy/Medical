import { Search } from "lucide-react";

function PatientSearch({ searchTerm, setSearchTerm }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

            <div className="flex gap-4">

                <div className="flex items-center gap-3 flex-1 border rounded-xl px-4 py-3">

                    <Search
                        size={18}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by patient name..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        className="w-full outline-none"
                    />

                </div>

            </div>

        </div>

    );

}

export default PatientSearch;