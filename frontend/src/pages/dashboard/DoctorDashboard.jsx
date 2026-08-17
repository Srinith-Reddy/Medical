import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import DoctorHero from "../../components/doctor/DoctorHero";
import DoctorStats from "../../components/doctor/DoctorStats";
import AppointmentList from "../../components/doctor/AppointmentList";
import RecentPatients from "../../components/doctor/RecentPatients";

import { getDoctors } from "../../services/doctorService";
import { getPatientsByDoctor } from "../../services/patientService";
import { getDoctorAppointments } from "../../services/appointmentService";

import { getPrescriptionById } from "../../services/prescriptionService";
import { getPatientRecords } from "../../services/recordService";


function DoctorDashboard() {

    const [doctor, setDoctor] = useState(null);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadDashboardData = async () => {

        try {

            setLoading(true);
            setError("");


            // -----------------------------------------
            // GET ORGANIZATION
            // -----------------------------------------

            const organizationId =
                localStorage.getItem("organizationId");


            if (!organizationId) {

                setError(
                    "Organization information not found."
                );

                return;

            }


            // -----------------------------------------
            // GET DOCTORS
            // -----------------------------------------

            const doctorsData =
                await getDoctors(organizationId);


            const currentDoctor =
                doctorsData?.[0];


            if (!currentDoctor) {

                setError("No doctor found.");

                return;

            }


            setDoctor(currentDoctor);


            // -----------------------------------------
            // GET DOCTOR'S PATIENTS
            // -----------------------------------------

            const patientsData =
                await getPatientsByDoctor(
                    currentDoctor.id
                );


            const doctorPatients =
                Array.isArray(patientsData)
                    ? patientsData
                    : [];


            setPatients(doctorPatients);


            // -----------------------------------------
            // GET DOCTOR'S APPOINTMENTS
            // -----------------------------------------

            const appointmentsData =
                await getDoctorAppointments(
                    currentDoctor.id
                );


            setAppointments(
                Array.isArray(appointmentsData)
                    ? appointmentsData
                    : []
            );


            // -----------------------------------------
            // GET RECORDS FOR DOCTOR'S PATIENTS
            // -----------------------------------------

            const recordsResults =
                await Promise.all(
                    doctorPatients.map(
                        async (patient) => {

                            try {

                                const data =
                                    await getPatientRecords(
                                        patient.id
                                    );

                                return Array.isArray(data)
                                    ? data
                                    : [];

                            } catch (error) {

                                console.error(
                                    `Failed to load records for patient ${patient.id}:`,
                                    error
                                );

                                return [];

                            }

                        }
                    )
                );


            const allRecords =
                recordsResults.flat();


            setRecords(allRecords);


            // -----------------------------------------
            // PRESCRIPTIONS
            // -----------------------------------------
            //
            // We currently don't have a doctor-level
            // prescription endpoint either.
            //
            // So don't make a broken request here.
            //
            // Keep this empty until we connect it
            // through patients.
            // -----------------------------------------

            setPrescriptions([]);


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


    // -----------------------------------------
    // LOADING
    // -----------------------------------------

    if (loading) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="
                    flex
                    items-center
                    justify-center
                    min-h-[60vh]
                ">

                    <p className="text-slate-500">
                        Loading doctor dashboard...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    // -----------------------------------------
    // ERROR
    // -----------------------------------------

    if (error) {

        return (

            <DashboardLayout
                sidebar={<DoctorSidebar />}
            >

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-red-200
                    p-8
                    text-center
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                        text-slate-900
                    ">
                        Something went wrong
                    </h2>


                    <p className="
                        text-red-600
                        mt-2
                    ">
                        {error}
                    </p>


                    <button
                        onClick={loadDashboardData}
                        className="
                            mt-5
                            px-5
                            py-2.5
                            rounded-xl
                            bg-blue-600
                            text-white
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Try Again
                    </button>

                </div>

            </DashboardLayout>

        );

    }


    // -----------------------------------------
    // DASHBOARD
    // -----------------------------------------

    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            <DoctorHero
                doctor={doctor}
            />


            <DoctorStats
                appointments={appointments.length}
                patients={patients.length}
                prescriptions={prescriptions.length}
                reports={records.length}
            />


            <div className="mt-8">

                <AppointmentList
                    appointments={appointments}
                />

            </div>


            <RecentPatients
                patients={patients}
            />

        </DashboardLayout>

    );

}


export default DoctorDashboard;