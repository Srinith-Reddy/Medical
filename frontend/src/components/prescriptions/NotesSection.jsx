function NotesSection({

    notes,
    setNotes

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">

            <h2 className="text-2xl font-semibold">

                Clinical Notes

            </h2>

            <p className="text-gray-500 mt-2 mb-6">

                Add any additional instructions or observations.

            </p>

            <textarea

                value={notes}

                onChange={(e) => setNotes(e.target.value)}

                rows={6}

                className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"

                placeholder="Write clinical notes here..."

            />

        </div>

    );

}

export default NotesSection;