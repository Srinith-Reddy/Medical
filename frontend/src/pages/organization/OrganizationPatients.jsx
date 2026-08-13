import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";

import { getPatientsByOrganization } from "../../services/patientService";


function OrganizationPatients() {

    const navigate = useNavigate();

    // Get organization ID from URL
    const { id } = useParams();

    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // --------------------------------------------------
    // LOAD PATIENTS FOR THIS ORGANIZATION
    // --------------------------------------------------

    useEffect(() => {

        if (id) {
            loadPatients();
        }

    }, [id]);


    const loadPatients = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getPatientsByOrganization(id);

            setPatients(data || []);

        } catch (error) {

            console.error(
                "Failed to load organization patients:",
                error
            );

            setError(
                "Unable to load patients for this organization."
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // FILTER PATIENTS
    // --------------------------------------------------

    const filteredPatients = patients.filter(
        (patient) => {

            const name =
                patient.name?.toLowerCase() || "";

            const search =
                searchTerm.toLowerCase();

            return name.includes(search);

        }
    );


    // --------------------------------------------------
    // PATIENT INITIAL
    // --------------------------------------------------

    const getInitial = (name) => {

        if (!name) {
            return "P";
        }

        return name
            .charAt(0)
            .toUpperCase();

    };


    // --------------------------------------------------
    // NO ORGANIZATION ID
    // --------------------------------------------------

    if (!id) {

        return (

            <DashboardLayout
                sidebar={<OrganizationSidebar />}
            >

                <div className="bg-white rounded-2xl border border-red-200 p-8">

                    <p className="text-red-600">
                        Organization ID is missing.
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* --------------------------------------------------
                HEADER
            -------------------------------------------------- */}

            <div className="mb-8">

                <p className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-blue-600
                    font-semibold
                ">
                    ORGANIZATION PORTAL
                </p>


                <h1 className="
                    text-4xl
                    font-bold
                    text-slate-900
                    mt-2
                ">
                    Patients
                </h1>


                <p className="
                    text-slate-500
                    mt-2
                ">
                    Patients associated with this organization.
                </p>

            </div>


            {/* --------------------------------------------------
                SEARCH
            -------------------------------------------------- */}

            <div className="mb-6">

                <input
                    type="text"
                    placeholder="🔍 Search patients..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-3.5
                        text-sm
                        shadow-sm
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                    "
                />

            </div>


            {/* --------------------------------------------------
                LOADING
            -------------------------------------------------- */}

            {loading && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-8
                    text-center
                ">

                    <p className="text-slate-500">
                        Loading patients...
                    </p>

                </div>

            )}


            {/* --------------------------------------------------
                ERROR
            -------------------------------------------------- */}

            {!loading && error && (

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-red-200
                    p-8
                    text-center
                ">

                    <p className="text-red-600">
                        {error}
                    </p>


                    <button
                        onClick={loadPatients}
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


            {/* --------------------------------------------------
                EMPTY STATE
            -------------------------------------------------- */}

            {!loading &&
                !error &&
                filteredPatients.length === 0 && (

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        p-10
                        text-center
                    ">

                        <div className="
                            w-14
                            h-14
                            mx-auto
                            rounded-2xl
                            bg-blue-50
                            flex
                            items-center
                            justify-center
                            text-blue-600
                            text-2xl
                        ">
                            👤
                        </div>


                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-900
                            mt-5
                        ">
                            No patients found
                        </h2>


                        <p className="
                            text-sm
                            text-slate-500
                            mt-2
                        ">
                            No patients are associated with this organization.
                        </p>

                    </div>

                )}


            {/* --------------------------------------------------
                PATIENT LIST
            -------------------------------------------------- */}

            {!loading &&
                !error &&
                filteredPatients.length > 0 && (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    ">

                        {filteredPatients.map(
                            (patient) => (

                                <div
                                    key={patient.id}
                                    onClick={() =>
                                        navigate(
                                            `/organization/${id}/patients/${patient.id}`,
                                            {
                                                state: {
                                                    patient
                                                }
                                            }
                                        )
                                    }
                                    className="
                                        bg-white
                                        rounded-2xl
                                        border
                                        border-slate-200
                                        p-5
                                        shadow-sm
                                        hover:shadow-md
                                        hover:border-blue-200
                                        cursor-pointer
                                        transition
                                    "
                                >

                                    {/* PATIENT HEADER */}

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">

                                        <div className="
                                            w-12
                                            h-12
                                            rounded-full
                                            bg-blue-50
                                            flex
                                            items-center
                                            justify-center
                                            text-blue-600
                                            font-bold
                                            text-lg
                                        ">

                                            {getInitial(
                                                patient.name
                                            )}

                                        </div>


                                        <div>

                                            <h2 className="
                                                font-semibold
                                                text-slate-900
                                            ">
                                                {patient.name ||
                                                    "Patient"}
                                            </h2>


                                            <p className="
                                                text-sm
                                                text-slate-500
                                                mt-0.5
                                            ">
                                                Patient
                                            </p>

                                        </div>

                                    </div>


                                    {/* PATIENT DETAILS */}

                                    <div className="
                                        mt-5
                                        space-y-2
                                    ">

                                        {patient.phone && (

                                            <div className="
                                                flex
                                                justify-between
                                                gap-4
                                                text-sm
                                            ">

                                                <span className="
                                                    text-slate-500
                                                ">
                                                    Phone
                                                </span>


                                                <span className="
                                                    font-medium
                                                    text-slate-800
                                                ">
                                                    {patient.phone}
                                                </span>

                                            </div>

                                        )}


                                        {patient.email && (

                                            <div className="
                                                flex
                                                justify-between
                                                gap-4
                                                text-sm
                                            ">

                                                <span className="
                                                    text-slate-500
                                                ">
                                                    Email
                                                </span>


                                                <span className="
                                                    font-medium
                                                    text-slate-800
                                                    text-right
                                                    break-all
                                                ">
                                                    {patient.email}
                                                </span>

                                            </div>

                                        )}

                                    </div>


                                    {/* VIEW PATIENT */}

                                    <div className="
                                        mt-5
                                        pt-3
                                        border-t
                                        border-slate-100
                                        flex
                                        justify-end
                                    ">

                                        <span className="
                                            text-sm
                                            font-medium
                                            text-blue-600
                                        ">
                                            View details →
                                        </span>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

        </DashboardLayout>

    );

}


export default OrganizationPatients;