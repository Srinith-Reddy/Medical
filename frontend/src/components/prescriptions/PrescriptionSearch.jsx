function PrescriptionSearch({

    searchTerm,
    setSearchTerm

}) {

    return (

        <div className="mb-8">

            <input

                type="text"

                placeholder="Search prescription..."

                value={searchTerm}

                onChange={(e) => setSearchTerm(e.target.value)}

                className="w-full border rounded-xl px-4 py-3"

            />

        </div>

    );

}

export default PrescriptionSearch;