import DoctorHero from "../../components/doctor/DoctorHero";
import DoctorStats from "../../components/doctor/DoctorStats";
import AppointmentList from "../../components/doctor/AppointmentList";
import RecentPatients from "../../components/doctor/RecentPatients";
import MedicalAlerts from "../../components/doctor/MedicalAlerts";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { useEffect, useState } from "react";
import { getDoctors } from "../../services/doctorService";

function DoctorDashboard() {

    const [doctors, setDoctors] = useState([]);

    const loadDoctors = async () => {

        try {

            const data = await getDoctors(
                "57387dc0-875c-47e5-a9fd-8c5afb531901"
            );

            setDoctors(data);

        }

        catch (error) {

            console.error("Error fetching doctors:", error);

        }

    };

    useEffect(() => {

        loadDoctors();

    }, []);

    console.log("Doctors:", doctors);

    return (

        <DashboardLayout>

            <DoctorHero doctor={doctors[0]} />

            <DoctorStats
                appointments={12}
                patients={124}
                prescriptions={38}
                reports={15}
            />

            <div className="grid grid-cols-3 gap-6 mt-8">

                <div className="col-span-2">

                    <AppointmentList />

                </div>

                <div>

                    <MedicalAlerts />

                </div>

            </div>

            <RecentPatients />

        </DashboardLayout>

    );

}

export default DoctorDashboard;