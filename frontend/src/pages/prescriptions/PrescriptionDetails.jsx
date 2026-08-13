import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getPrescriptionById } from "../../services/prescriptionService";

function PrescriptionDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [prescription, setPrescription] = useState(null);

    useEffect(() => {

        loadPrescription();

    }, []);

    const loadPrescription = async () => {

        try {

            const data = await getPrescriptionById(id);

            setPrescription(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!prescription) {

        return (

            <DashboardLayout>

                <div className="text-center py-20">

                    Loading Prescription...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Prescription Details

                    </h1>

                    <p className="text-gray-500 mt-2">

                        View complete prescription information.

                    </p>

                </div>

                {/* Basic Information */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    <h2 className="text-2xl font-semibold mb-6">

                        Prescription Information

                    </h2>

                    <div className="grid grid-cols-2 gap-6">

                        <div>

                            <p className="text-gray-500">

                                Patient ID

                            </p>

                            <h3 className="font-semibold">

                                {prescription.patient_id}

                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">

                                Doctor ID

                            </p>

                            <h3 className="font-semibold">

                                {prescription.staff_id}

                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">

                                Organization

                            </p>

                            <h3 className="font-semibold">

                                {prescription.organization_id}

                            </h3>

                        </div>

                        <div>

                            <p className="text-gray-500">

                                Consultation

                            </p>

                            <h3 className="font-semibold">

                                {prescription.consultation_id}

                            </h3>

                        </div>

                    </div>

                </div>

                {/* Medicines */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    <h2 className="text-2xl font-semibold mb-6">

                        Medicines

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3">

                                    Medicine ID

                                </th>

                                <th className="text-left py-3">

                                    Dosage

                                </th>

                                <th className="text-left py-3">

                                    Quantity

                                </th>

                                <th className="text-left py-3">

                                    Instructions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {prescription.medicines.map((medicine, index) => (

                                <tr key={index} className="border-b">

                                    <td className="py-4">

                                        {medicine.medicine_id}

                                    </td>

                                    <td>

                                        {medicine.dosage}

                                    </td>

                                    <td>

                                        {medicine.quantity}

                                    </td>

                                    <td>

                                        {medicine.instructions}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Notes */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    <h2 className="text-2xl font-semibold mb-4">

                        Clinical Notes

                    </h2>

                    <p className="text-gray-700 whitespace-pre-line">

                        {prescription.notes || "No notes available."}

                    </p>

                </div>

                <div className="flex justify-end">

                    <button

                        onClick={() => navigate("/prescriptions")}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

                    >

                        Back

                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default PrescriptionDetails;