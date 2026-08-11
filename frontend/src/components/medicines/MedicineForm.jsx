import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMedicine } from "../../services/medicineService";

function MedicineForm() {

    const [formData, setFormData] = useState({
        name: "",
        generic_name: "",
        category: "",
        standard_dosage: "",
        manufacturer: "",
        form: "",
        requires_rx: false
    });

    const navigate = useNavigate();

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createMedicine(formData);

            alert("✅ Medicine added successfully!");

            navigate("/medicines");

        } catch (error) {

            console.error(error);

            alert("Failed to add medicine.");

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
        >

            <div className="grid grid-cols-2 gap-6">

                <input
                    name="name"
                    placeholder="Medicine Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                />

                <input
                    name="generic_name"
                    placeholder="Generic Name"
                    value={formData.generic_name}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                />

                <input
                    name="standard_dosage"
                    placeholder="Standard Dosage"
                    value={formData.standard_dosage}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                />

                <input
                    name="manufacturer"
                    placeholder="Manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                />

                <select
                    name="form"
                    value={formData.form}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                    required
                >
                    <option value="">Select Form</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream">Cream</option>
                    <option value="Drops">Drops</option>
                </select>

            </div>

            <label className="flex items-center gap-3">

                <input
                    type="checkbox"
                    name="requires_rx"
                    checked={formData.requires_rx}
                    onChange={handleChange}
                />

                Prescription Required

            </label>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
                Add Medicine
            </button>

        </form>

    );

}

export default MedicineForm;