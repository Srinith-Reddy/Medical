import { useEffect, useState } from "react";
import { getAllOrganizations } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

function OrganizationDoctors() {

    const [organization, setOrganization] = useState(null);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------------------------
    // LOAD ORGANIZATION + DOCTORS
    // --------------------------------------------------

    useEffect(() => {

        loadDoctors();

    }, []);


    const loadDoctors = async () => {

        try {

            setLoading(true);
            setError("");

            // Temporary until authentication is implemented.
            // First organization = currently logged-in organization.

            const organizations =
                await getAllOrganizations();

            const currentOrganization =
                organizations?.[0];


            if (!currentOrganization) {

                setError("No organization found.");

                return;

            }


            setOrganization(currentOrganization);


            // Get doctors belonging to this organization

            const doctorsData =
                await getDoctors(currentOrganization.id);


            setDoctors(
                Array.isArray(doctorsData)
                    ? doctorsData
                    : []
            );

        } catch (error) {

            console.error(
                "Failed to load organization doctors:",
                error
            );

            setError(
                "Unable to load doctors. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* Header */}

            <div className="mb-8">

                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 font-medium">
                    ORGANIZATION PORTAL
                </p>

                <h1 className="text-4xl font-bold text-slate-900 mt-2">
                    Doctors
                </h1>

                <p className="text-slate-500 mt-2">
                    Doctors associated with{" "}
                    <span className="font-medium text-slate-700">
                        {organization?.name || "your organization"}
                    </span>
                </p>

            </div>


            {/* Loading */}

            {loading && (

                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">

                    <p className="text-slate-500">
                        Loading doctors...
                    </p>

                </div>

            )}


            {/* Error */}

            {!loading && error && (

                <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">

                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        onClick={loadDoctors}
                        className="
                            mt-4
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

            )}


            {/* No Doctors */}

            {!loading &&
                !error &&
                doctors.length === 0 && (

                    <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">

                        <h2 className="text-lg font-semibold text-slate-900">
                            No doctors found
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            No doctors are currently associated with this organization.
                        </p>

                    </div>

                )}


            {/* Doctors */}

            {!loading &&
                !error &&
                doctors.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {doctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="
                                    bg-white
                                    rounded-[24px]
                                    border
                                    border-slate-200
                                    p-6
                                    shadow-sm
                                    hover:shadow-md
                                    transition
                                "
                            >

                                {/* Doctor Avatar */}

                                <div className="flex items-center gap-4">

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-full
                                        bg-blue-100
                                        flex
                                        items-center
                                        justify-center
                                        text-blue-600
                                        font-semibold
                                        text-lg
                                    ">

                                        {doctor.name
                                            ? doctor.name
                                                .charAt(0)
                                                .toUpperCase()
                                            : "D"}

                                    </div>


                                    <div>

                                        <h2 className="text-lg font-semibold text-slate-900">
                                            {doctor.name || "Doctor"}
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Doctor
                                        </p>

                                    </div>

                                </div>


                                {/* Doctor Information */}

                                <div className="mt-6 space-y-3">

                                    {doctor.phone && (

                                        <div>

                                            <p className="text-xs text-slate-400 uppercase tracking-wide">
                                                Phone
                                            </p>

                                            <p className="text-sm text-slate-700 mt-1">
                                                {doctor.phone}
                                            </p>

                                        </div>

                                    )}


                                    {doctor.email && (

                                        <div>

                                            <p className="text-xs text-slate-400 uppercase tracking-wide">
                                                Email
                                            </p>

                                            <p className="text-sm text-slate-700 mt-1 break-all">
                                                {doctor.email}
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

        </DashboardLayout>

    );

}

export default OrganizationDoctors;