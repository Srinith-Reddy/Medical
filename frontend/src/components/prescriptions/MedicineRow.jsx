function MedicineRow({

    medicine,
    medicines,
    index,
    updateMedicine,
    removeMedicine

}) {

    return (

        <div className="grid grid-cols-12 gap-4 items-end mb-4 p-4 border rounded-xl">

            {/* Medicine */}

            <div className="col-span-3">

                <label className="block text-sm font-medium mb-2">

                    Medicine

                </label>

                <select
                    value={medicine.medicine_id}
                    onChange={(e) =>
                        updateMedicine(
                            index,
                            "medicine_id",
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg p-3"
                >

                    <option value="">
                        Select Medicine
                    </option>

                    {medicines.map((med) => (

                        <option
                            key={med.id}
                            value={med.id}
                        >

                            {med.name}

                        </option>

                    ))}

                </select>

            </div>

            {/* Dosage */}

            <div className="col-span-2">

                <label className="block text-sm font-medium mb-2">

                    Dosage

                </label>

                <input
                    type="text"
                    value={medicine.dosage}
                    onChange={(e) =>
                        updateMedicine(
                            index,
                            "dosage",
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg p-3"
                    placeholder="650 mg"
                />

            </div>

            {/* Quantity */}

            <div className="col-span-2">

                <label className="block text-sm font-medium mb-2">

                    Quantity

                </label>

                <input
                    type="number"
                    value={medicine.quantity}
                    onChange={(e) =>
                        updateMedicine(
                            index,
                            "quantity",
                            Number(e.target.value)
                        )
                    }
                    className="w-full border rounded-lg p-3"
                />

            </div>

            {/* Instructions */}

            <div className="col-span-4">

                <label className="block text-sm font-medium mb-2">

                    Instructions

                </label>

                <input
                    type="text"
                    value={medicine.instructions}
                    onChange={(e) =>
                        updateMedicine(
                            index,
                            "instructions",
                            e.target.value
                        )
                    }
                    className="w-full border rounded-lg p-3"
                    placeholder="After food"
                />

            </div>

            {/* Remove */}

            <div className="col-span-1">

                <button
                    type="button"
                    onClick={() => removeMedicine(index)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-3"
                >

                    ✕

                </button>

            </div>

        </div>

    );

}

export default MedicineRow;