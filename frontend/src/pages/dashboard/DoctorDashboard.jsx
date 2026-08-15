import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import DoctorHero from "../../components/doctor/DoctorHero";
import DoctorStats from "../../components/doctor/DoctorStats";
import AppointmentList from "../../components/doctor/AppointmentList";
import RecentPatients from "../../components/doctor/RecentPatients";
import MedicalAlerts from "../../components/doctor/MedicalAlerts";

import { getDoctors } from "../../services/doctorService";
import { getAllPatients } from "../../services/patientService";

function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboardData = async () => {

        try {

            setLoading(true);
            setError("");

            /*
             * Temporary doctor selection.
             * Later this will come from authentication/login.
             */

            const organizationId =
                localStorage.getItem("organizationId");

            if (!organizationId) {

                setError("Organization information not found.");

                return;

            }

            /*
             * Get doctors from the existing backend.
             */

            const doctorsData =
                await getDoctors(organizationId);

            const currentDoctor =
                doctorsData?.[0];

            if (!currentDoctor) {

                setError("No doctor found.");

                return;

            }

            setDoctor(currentDoctor);


            /*
             * Get existing patients from backend.
             *
             * These are REAL patients already stored
             * in your database.
             */

            const patientsData =
                await getAllPatients();

            setPatients(
                Array.isArray(patientsData)
                    ? patientsData
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load doctor dashboard:",
                error
            );

            setError(
                "Unable to load doctor dashboard."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadDashboardData();

    }, []);


    if (loading) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="flex items-center justify-center min-h-[60vh]">

                    <p className="text-slate-500">
                        Loading doctor dashboard...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    if (error) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Something went wrong
                    </h2>

                    <p className="text-red-600 mt-2">
                        {error}
                    </p>

                    <button
                        onClick={loadDashboardData}
                        className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            {/* Doctor information */}

            <DoctorHero
                doctor={doctor}
            />


            {/* Statistics */}

            <DoctorStats
                appointments={0}
                patients={patients.length}
                prescriptions={0}
                reports={0}
            />


            {/* Main dashboard */}

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <AppointmentList />

                </div>


                <div>

                    <MedicalAlerts />

                </div>

            </div>


            {/* Existing patients */}

            <RecentPatients
                patients={patients}
            />

        </DashboardLayout>

    );

}

export default DoctorDashboard;