import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getAllOrganizations } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";
import { getOrganizationAppointments } from "../../services/appointmentService";

import OrganizationHero from "../../components/organization/OrganizationHero";
import OrganizationStats from "../../components/organization/OrganizationStats";


function OrganizationDashboard() {

    const [organization, setOrganization] = useState(null);

    const [doctorCount, setDoctorCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------------------------
    // LOAD CURRENT ORGANIZATION
    // --------------------------------------------------

    useEffect(() => {
        loadOrganizationData();
    }, []);


    const loadOrganizationData = async () => {

        try {

            setLoading(true);
            setError("");


            // Temporary until authentication is implemented.
            // For now, the first organization is treated
            // as the currently logged-in organization.

            const organizationsData =
                await getAllOrganizations();


            const currentOrganization =
                organizationsData?.[0];


            if (!currentOrganization) {

                setError("No organization found.");

                return;

            }


            // Save organization in state

            setOrganization(currentOrganization);


            // Save organization ID so that the sidebar
            // can use it on every organization page.

            localStorage.setItem(
                "organizationId",
                currentOrganization.id
            );


            // --------------------------------------------------
            // LOAD DOCTORS + APPOINTMENTS
            // --------------------------------------------------

            const [
                doctorsData,
                appointmentsData
            ] = await Promise.all([

                getDoctors(
                    currentOrganization.id
                ),

                getOrganizationAppointments(
                    currentOrganization.id
                )

            ]);


            setDoctorCount(
                Array.isArray(doctorsData)
                    ? doctorsData.length
                    : 0
            );


            setAppointmentCount(
                Array.isArray(appointmentsData)
                    ? appointmentsData.length
                    : 0
            );


        } catch (error) {

            console.error(
                "Failed to load organization dashboard:",
                error
            );


            setError(
                "Unable to load organization dashboard. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (

            <DashboardLayout
                sidebar={
                    <OrganizationSidebar />
                }
            >

                <div className="flex items-center justify-center min-h-[60vh]">

                    <p className="text-slate-500">
                        Loading organization dashboard...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    // --------------------------------------------------
    // ERROR
    // --------------------------------------------------

    if (error) {

        return (

            <DashboardLayout
                sidebar={
                    <OrganizationSidebar />
                }
            >

                <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

                    <h2 className="text-lg font-semibold text-slate-900">
                        Something went wrong
                    </h2>


                    <p className="text-sm text-red-600 mt-2">
                        {error}
                    </p>


                    <button
                        onClick={loadOrganizationData}
                        className="
                            mt-5
                            px-5
                            py-2.5
                            rounded-xl
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
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


    // --------------------------------------------------
    // DASHBOARD
    // --------------------------------------------------

    return (

        <DashboardLayout
            sidebar={
                <OrganizationSidebar />
            }
        >

            {/* --------------------------------------------------
                ORGANIZATION HERO
            -------------------------------------------------- */}

            <div className="mb-8">

                <OrganizationHero
                    organization={organization}
                />

            </div>


            {/* --------------------------------------------------
                ORGANIZATION STATS
            -------------------------------------------------- */}

            <OrganizationStats
                doctorCount={doctorCount}
                appointmentCount={appointmentCount}
            />


        </DashboardLayout>

    );

}


export default OrganizationDashboard;