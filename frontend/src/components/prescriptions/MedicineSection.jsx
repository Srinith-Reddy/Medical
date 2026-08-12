import MedicineRow from "./MedicineRow";

function MedicineSection({

    medicines,
    prescriptionMedicines,
    addMedicine,
    updateMedicine,
    removeMedicine

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-semibold">

                        Medicines

                    </h2>

                    <p className="text-gray-500 mt-1">

                        Add one or more medicines to this prescription.

                    </p>

                </div>

                <button
                    type="button"
                    onClick={addMedicine}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                >

                    + Add Medicine

                </button>

            </div>

            {prescriptionMedicines.map((medicine, index) => (

                <MedicineRow

                    key={index}

                    index={index}

                    medicine={medicine}

                    medicines={medicines}

                    updateMedicine={updateMedicine}

                    removeMedicine={removeMedicine}

                />

            ))}

        </div>

    );

}

export default MedicineSection;