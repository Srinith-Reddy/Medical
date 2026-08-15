import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getStaffByOrganization } from "../../services/staffService";

import { FlaskConical, Mail, UserRound } from "lucide-react";


function OrganizationLabs() {

    const [labs, setLabs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const organizationId =
        localStorage.getItem("organizationId");


    useEffect(() => {

        if (!organizationId) {

            setError(
                "Organization information is not available."
            );

            setLoading(false);

            return;
        }

        loadLabs();

    }, [organizationId]);


    const loadLabs = async () => {

        try {

            setLoading(true);
            setError("");

            const staff =
                await getStaffByOrganization(
                    organizationId
                );

            // Only show staff whose role is LAB
            const labStaff =
                Array.isArray(staff)
                    ? staff.filter(
                        (member) =>
                            member.role?.toUpperCase() === "LAB"
                    )
                    : [];

            setLabs(labStaff);

        } catch (error) {

            console.error(
                "Failed to load labs:",
                error
            );

            setError(
                "Unable to load labs for this organization."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <DashboardLayout
            sidebar={
                <OrganizationSidebar
                    organizationId={organizationId}
                />
            }
        >

            {/* PAGE HEADER */}

            <div className="mb-8">

                <p className="
                    text-sm
                    font-semibold
                    tracking-[0.25em]
                    text-blue-600
                    uppercase
                ">
                    Organization Portal
                </p>

                <h1 className="
                    text-4xl
                    font-bold
                    text-slate-900
                    mt-3
                ">
                    Labs
                </h1>

                <p className="
                    text-slate-500
                    mt-2
                    text-lg
                ">
                    Laboratories associated with your organization.
                </p>

            </div>


            {/* LOADING */}

            {loading && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-10
                    text-center
                ">

                    <p className="text-slate-500">
                        Loading labs...
                    </p>

                </div>

            )}


            {/* ERROR */}

            {!loading && error && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-red-200
                    p-10
                    text-center
                ">

                    <p className="
                        text-red-600
                        font-medium
                    ">
                        {error}
                    </p>

                    <button
                        onClick={loadLabs}
                        className="
                            mt-5
                            px-5
                            py-2.5
                            rounded-xl
                            bg-blue-600
                            text-white
                            font-medium
                            hover:bg-blue-700
                            transition
                        "
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* NO LABS */}

            {!loading &&
                !error &&
                labs.length === 0 && (

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-12
                        text-center
                    ">

                        <div className="
                            w-16
                            h-16
                            mx-auto
                            rounded-2xl
                            bg-blue-50
                            flex
                            items-center
                            justify-center
                        ">

                            <FlaskConical
                                size={30}
                                className="text-blue-600"
                            />

                        </div>

                        <h2 className="
                            text-xl
                            font-semibold
                            text-slate-900
                            mt-5
                        ">
                            No labs found
                        </h2>

                        <p className="
                            text-slate-500
                            mt-2
                        ">
                            No laboratory staff are currently
                            associated with this organization.
                        </p>

                    </div>

                )}


            {/* LAB CARDS */}

            {!loading &&
                !error &&
                labs.length > 0 && (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    ">

                        {labs.map((lab) => (

                            <div
                                key={lab.id}
                                className="
                                    bg-white
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    shadow-sm
                                    p-6
                                    hover:shadow-md
                                    transition
                                "
                            >

                                {/* LAB HEADER */}

                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    <div className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-blue-50
                                        flex
                                        items-center
                                        justify-center
                                    ">

                                        <FlaskConical
                                            size={26}
                                            className="text-blue-600"
                                        />

                                    </div>


                                    <div>

                                        <h2 className="
                                            text-lg
                                            font-semibold
                                            text-slate-900
                                        ">
                                            {lab.name}
                                        </h2>

                                        <p className="
                                            text-sm
                                            text-blue-600
                                            font-medium
                                        ">
                                            Laboratory
                                        </p>

                                    </div>

                                </div>


                                {/* DETAILS */}

                                <div className="
                                    mt-6
                                    space-y-4
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                        text-sm
                                    ">

                                        <Mail
                                            size={18}
                                            className="text-slate-400"
                                        />

                                        <span className="
                                            text-slate-600
                                        ">
                                            {lab.email}
                                        </span>

                                    </div>


                                    {lab.specialization && (

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            text-sm
                                        ">

                                            <UserRound
                                                size={18}
                                                className="text-slate-400"
                                            />

                                            <span className="
                                                text-slate-600
                                            ">
                                                {lab.specialization}
                                            </span>

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

export default OrganizationLabs;