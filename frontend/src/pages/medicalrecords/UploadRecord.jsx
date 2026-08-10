import { useState } from "react";

function UploadRecordForm() {

    const [formData, setFormData] = useState({
        patient: "",
        recordType: "",
        description: "",
        file: null
    });

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(formData);

        alert("Record uploaded successfully! (Backend integration pending)");

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6"
        >

            <div className="grid grid-cols-2 gap-6">

                <input
                    type="text"
                    name="patient"
                    placeholder="Patient Name"
                    value={formData.patient}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <select
                    name="recordType"
                    value={formData.recordType}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                >
                    <option value="">Select Record Type</option>
                    <option>Blood Test</option>
                    <option>X-Ray</option>
                    <option>MRI</option>
                    <option>CT Scan</option>
                    <option>Prescription</option>
                    <option>Other</option>
                </select>

            </div>

            <textarea
                name="description"
                placeholder="Description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
            />

            <input
                type="file"
                name="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
                Upload Record
            </button>

        </form>

    );

}

export default UploadRecordForm;