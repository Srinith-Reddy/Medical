function PrescriptionTable() {

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-800">
                    Prescriptions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    View and manage patient prescriptions
                </p>
            </div>

            <div className="p-8 text-center text-gray-500">
                No prescriptions available.
            </div>

        </div>
    );

}

export default PrescriptionTable;