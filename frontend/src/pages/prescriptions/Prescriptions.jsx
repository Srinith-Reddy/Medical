import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    FileText,
    Pill,
    Eye
} from "lucide-react";

import {
    getDoctorPrescriptions
} from "../../services/prescriptionService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";


function Prescriptions() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const doctorId =
        searchParams.get("doctorId") ||
        localStorage.getItem("doctorId") ||
        "";

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadPrescriptions = async () => {

        if (!doctorId) {

            setError(
                "Doctor ID is not available."
            );

            setLoading(false);

            return;
        }

        try {

            setLoading(true);
            setError("");

            const data =
                await getDoctorPrescriptions(
                    doctorId
                );

            setPrescriptions(
                data || []
            );

        } catch (error) {

            console.error(
                "Failed to load prescriptions:",
                error
            );

            const detail =
                error.response?.data?.detail;

            setError(
                typeof detail === "string"
                    ? detail
                    : "Unable to load prescriptions."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadPrescriptions();

    }, [doctorId]);


    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            <div className="mb-8">

                <p className="
                    text-sm
                    text-slate-500
                ">
                    Prescriptions
                </p>

                <h1 className="
                    text-3xl
                    font-semibold
                    text-slate-900
                    mt-1
                ">
                    Prescriptions
                </h1>

                <p className="
                    text-slate-500
                    mt-2
                ">
                    Prescriptions created by you.
                </p>

            </div>


            {loading && (
                <div className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    p-10
                    text-center
                ">
                    <p className="text-slate-500">
                        Loading prescriptions...
                    </p>
                </div>
            )}


            {!loading && error && (
                <div className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-2xl
                    p-6
                    text-red-700
                ">
                    {error}
                </div>
            )}


            {!loading &&
                !error &&
                prescriptions.length === 0 && (

                    <div className="
                        bg-white
                        border
                        border-slate-200
                        rounded-2xl
                        p-10
                        text-center
                    ">

                        <FileText
                            size={36}
                            className="
                                mx-auto
                                text-slate-400
                                mb-3
                            "
                        />

                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-900
                        ">
                            No prescriptions yet
                        </h2>

                        <p className="
                            text-sm
                            text-slate-500
                            mt-1
                        ">
                            Prescriptions you create will appear here.
                        </p>

                    </div>
                )
            }


            {!loading &&
                !error &&
                prescriptions.length > 0 && (

                    <div className="space-y-4">

                        {prescriptions.map(
                            (item) => {

                                const prescription =
                                    item.prescription ||
                                    item;

                                return (

                                    <div
                                        key={prescription.id}
                                        className="
                                            bg-white
                                            border
                                            border-slate-200
                                            rounded-2xl
                                            p-6
                                            shadow-sm
                                        "
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-green-50
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">
                                                    <Pill
                                                        size={21}
                                                        className="text-green-600"
                                                    />
                                                </div>

                                                <div>

                                                    <h2 className="
                                                        font-semibold
                                                        text-slate-900
                                                    ">
                                                        Prescription
                                                    </h2>

                                                    <p className="
                                                        text-sm
                                                        text-slate-500
                                                        mt-1
                                                    ">
                                                        Patient ID:{" "}
                                                        {prescription.patient_id}
                                                    </p>

                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                        mt-1
                                                    ">
                                                        {prescription.created_at
                                                            ? new Date(
                                                                prescription.created_at
                                                            ).toLocaleString()
                                                            : "Recently created"
                                                        }
                                                    </p>

                                                </div>

                                            </div>


                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/prescriptions/${prescription.id}`
                                                    )
                                                }
                                                className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-4
                                                    py-2.5
                                                    rounded-xl
                                                    bg-slate-900
                                                    text-white
                                                    text-sm
                                                    font-medium
                                                    hover:bg-slate-800
                                                "
                                            >
                                                <Eye size={17} />
                                                View
                                            </button>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>
                )
            }

        </DashboardLayout>

    );

}


export default Prescriptions;