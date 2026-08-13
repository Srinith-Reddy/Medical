import { useLocation, useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import OrganizationSidebar from "../../components/sidebar/OrganizationSidebar";


function OrganizationPatientDetails() {

    const location = useLocation();
    const navigate = useNavigate();

    const patient = location.state?.patient;


    // --------------------------------------------------
    // PATIENT NOT FOUND
    // --------------------------------------------------

    if (!patient) {

        return (

            <DashboardLayout
                sidebar={<OrganizationSidebar />}
            >

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-10
                    text-center
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        text-slate-900
                    ">
                        Patient not found
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        The patient information could not be loaded.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/organization/patients")
                        }
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
                        Back to Patients
                    </button>

                </div>

            </DashboardLayout>

        );

    }


    const initial =
        patient.name?.charAt(0).toUpperCase() || "P";


    return (

        <DashboardLayout
            sidebar={<OrganizationSidebar />}
        >

            {/* --------------------------------------------------
                BACK BUTTON
            -------------------------------------------------- */}

            <button
                onClick={() =>
                    navigate("/organization/patients")
                }
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-blue-600
                    font-medium
                    hover:text-blue-700
                    transition
                    mb-6
                "
            >
                ← Back to Patients
            </button>


            {/* --------------------------------------------------
                PATIENT HERO
            -------------------------------------------------- */}

            <div className="
                bg-blue-600
                rounded-[28px]
                p-8
                text-white
                shadow-lg
            ">

                <div className="
                    flex
                    items-center
                    gap-5
                ">

                    <div className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-white/15
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                    ">
                        {initial}
                    </div>


                    <div>

                        <p className="
                            text-blue-100
                            text-sm
                            uppercase
                            tracking-[0.2em]
                        ">
                            PATIENT
                        </p>

                        <h1 className="
                            text-3xl
                            font-bold
                            mt-1
                        ">
                            {patient.name || "Patient"}
                        </h1>

                    </div>

                </div>

            </div>


            {/* --------------------------------------------------
                PATIENT INFORMATION
            -------------------------------------------------- */}

            <div className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                p-6
                mt-6
            ">

                <h2 className="
                    text-lg
                    font-semibold
                    text-slate-900
                ">
                    Patient Information
                </h2>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                    mt-5
                ">

                    {/* NAME */}

                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Name
                        </p>

                        <p className="
                            font-medium
                            text-slate-900
                            mt-1
                        ">
                            {patient.name || "--"}
                        </p>

                    </div>


                    {/* PHONE */}

                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Phone
                        </p>

                        <p className="
                            font-medium
                            text-slate-900
                            mt-1
                        ">
                            {patient.phone || "--"}
                        </p>

                    </div>


                    {/* EMAIL */}

                    <div>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Email
                        </p>

                        <p className="
                            font-medium
                            text-slate-900
                            mt-1
                            break-all
                        ">
                            {patient.email || "--"}
                        </p>

                    </div>

                </div>

            </div>


            {/* --------------------------------------------------
                FUTURE FEATURES
            -------------------------------------------------- */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
                mt-6
            ">

                {/* MEDICAL RECORDS */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-6
                ">

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        text-blue-600
                        text-lg
                    ">
                        📄
                    </div>

                    <h2 className="
                        font-semibold
                        text-slate-900
                        mt-4
                    ">
                        Medical Records
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Medical records will appear here once
                        the records API is connected.
                    </p>

                </div>


                {/* APPOINTMENTS */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    p-6
                ">

                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        text-blue-600
                        text-lg
                    ">
                        📅
                    </div>

                    <h2 className="
                        font-semibold
                        text-slate-900
                        mt-4
                    ">
                        Appointments
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-2
                    ">
                        Patient appointment history will appear
                        here once the appointment API is connected.
                    </p>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default OrganizationPatientDetails;