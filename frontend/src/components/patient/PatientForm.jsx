import { useEffect, useState } from "react";
import {
    createPatient,
    updatePatient
} from "../../services/patientService";

function PatientForm({
    mode = "add",
    patient = null
}) {

    const [formData, setFormData] = useState({
        aadhaar_number: "",
        name: "",
        dob: "",
        gender: "",
        phone: "",
        blood_group: "",
        height: "",
        weight: ""
    });

    useEffect(() => {

        if (mode === "edit" && patient) {

            setFormData({
                aadhaar_number: patient.aadhaar_number || "",
                name: patient.name || "",
                dob: patient.dob || "",
                gender: patient.gender || "",
                phone: patient.phone || "",
                blood_group: patient.blood_group || "",
                height: patient.height || "",
                weight: patient.weight || ""
            });

        }

    }, [mode, patient]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (mode === "add") {

                await createPatient(formData);

                alert("Patient added successfully!");

                setFormData({
                    aadhaar_number: "",
                    name: "",
                    dob: "",
                    gender: "",
                    phone: "",
                    blood_group: "",
                    height: "",
                    weight: ""
                });

            } else {

                await updatePatient(
                    patient.id,
                    formData
                );

                alert("Patient updated successfully!");

            }

        } catch (error) {

            console.error(error);

            alert(
                mode === "add"
                    ? "Failed to add patient."
                    : "Failed to update patient."
            );

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
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    name="aadhaar_number"
                    placeholder="Aadhaar Number"
                    value={formData.aadhaar_number}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    name="blood_group"
                    placeholder="Blood Group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={formData.height}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={formData.weight}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >

                {mode === "add"
                    ? "Register Patient"
                    : "Update Patient"}

            </button>

        </form>

    );

}

export default PatientForm;