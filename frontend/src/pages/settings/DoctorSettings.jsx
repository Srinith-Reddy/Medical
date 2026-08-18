import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

import { getDoctors } from "../../services/doctorService";

function DoctorSettings() {

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [notifications, setNotifications] = useState({
        appointments: true,
        prescriptions: true,
        patients: true,
    });

    const [showPassword, setShowPassword] = useState(false);


    // --------------------------------------------------
    // LOAD DOCTOR
    // --------------------------------------------------

    const loadDoctor = async () => {

        try {

            setLoading(true);
            setError("");

            const organizationId =
                localStorage.getItem("organizationId");


            if (!organizationId) {

                setError(
                    "Organization information not found."
                );

                return;
            }


            const doctorsData =
                await getDoctors(organizationId);


            const currentDoctor =
                doctorsData?.[0];


            if (!currentDoctor) {

                setError(
                    "No doctor found."
                );

                return;
            }


            setDoctor(currentDoctor);

        }

        catch (error) {

            console.error(
                "Failed to load doctor settings:",
                error
            );

            setError(
                "Unable to load doctor information."
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadDoctor();

    }, []);


    // --------------------------------------------------
    // NOTIFICATIONS
    // --------------------------------------------------

    const toggleNotification = (name) => {

        setNotifications((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));

    };


    // --------------------------------------------------
    // SAVE PROFILE
    // --------------------------------------------------

    const handleSave = (e) => {

        e.preventDefault();

        console.log(
            "Doctor profile:",
            doctor
        );

        console.log(
            "Notifications:",
            notifications
        );

        alert(
            "Settings saved successfully!"
        );

    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

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
                        Loading settings...
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
                        onClick={loadDoctor}
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


    // --------------------------------------------------
    // SETTINGS
    // --------------------------------------------------

    return (

        <DashboardLayout
            sidebar={<DoctorSidebar />}
        >

            <div className="max-w-5xl mx-auto">

                {/* -------------------------------------- */}
                {/* HEADER */}
                {/* -------------------------------------- */}

                <div className="mb-8">

                    <p className="text-sm text-slate-500">
                        Account
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-slate-900
                        mt-1
                    ">
                        Settings
                    </h1>

                    <p className="
                        text-slate-500
                        mt-2
                    ">
                        Manage your profile, notifications
                        and account security.
                    </p>

                </div>


                {/* -------------------------------------- */}
                {/* PROFILE */}
                {/* -------------------------------------- */}

                <form
                    onSubmit={handleSave}
                    className="
                        bg-white
                        rounded-2xl
                        border
                        border-slate-200
                        shadow-sm
                        p-8
                        mb-6
                    "
                >

                    <div className="
                        flex
                        items-center
                        gap-4
                        mb-8
                    ">

                        <div className="
                            w-16
                            h-16
                            rounded-full
                            bg-blue-100
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            text-2xl
                            font-bold
                        ">

                            {doctor?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "D"}

                        </div>


                        <div>

                            <h2 className="
                                text-xl
                                font-semibold
                                text-slate-900
                            ">
                                Doctor Profile
                            </h2>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">
                                Your professional information.
                            </p>

                        </div>

                    </div>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    ">

                        {/* NAME */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={doctor?.name || ""}
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        name: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Email
                            </label>

                            <input
                                type="email"
                                value={doctor?.email || ""}
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        email: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* PHONE */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                value={doctor?.phone || ""}
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        phone: e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* SPECIALIZATION */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Specialization
                            </label>

                            <input
                                type="text"
                                value={
                                    doctor?.specialization || ""
                                }
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        specialization:
                                            e.target.value
                                    })
                                }
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                    </div>


                    {/* SAVE */}

                    <div className="
                        flex
                        justify-end
                        mt-8
                    ">

                        <button
                            type="submit"
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                font-medium
                                px-6
                                py-3
                                rounded-xl
                                transition
                            "
                        >
                            Save Changes
                        </button>

                    </div>

                </form>


                {/* -------------------------------------- */}
                {/* NOTIFICATIONS */}
                {/* -------------------------------------- */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                    mb-6
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        text-slate-900
                    ">
                        Notifications
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                        mb-6
                    ">
                        Choose which notifications you
                        want to receive.
                    </p>


                    {/* APPOINTMENTS */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        py-4
                        border-b
                        border-slate-100
                    ">

                        <div>

                            <p className="
                                font-medium
                                text-slate-900
                            ">
                                Appointment Notifications
                            </p>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">
                                Receive updates about appointments.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                toggleNotification(
                                    "appointments"
                                )
                            }
                            className={`
                                w-12
                                h-6
                                rounded-full
                                relative
                                transition
                                ${
                                    notifications.appointments
                                        ? "bg-blue-600"
                                        : "bg-slate-300"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    w-4
                                    h-4
                                    bg-white
                                    rounded-full
                                    transition
                                    ${
                                        notifications.appointments
                                            ? "left-7"
                                            : "left-1"
                                    }
                                `}
                            />

                        </button>

                    </div>


                    {/* PRESCRIPTIONS */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        py-4
                        border-b
                        border-slate-100
                    ">

                        <div>

                            <p className="
                                font-medium
                                text-slate-900
                            ">
                                Prescription Notifications
                            </p>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">
                                Receive updates about prescriptions.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                toggleNotification(
                                    "prescriptions"
                                )
                            }
                            className={`
                                w-12
                                h-6
                                rounded-full
                                relative
                                transition
                                ${
                                    notifications.prescriptions
                                        ? "bg-blue-600"
                                        : "bg-slate-300"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    w-4
                                    h-4
                                    bg-white
                                    rounded-full
                                    transition
                                    ${
                                        notifications.prescriptions
                                            ? "left-7"
                                            : "left-1"
                                    }
                                `}
                            />

                        </button>

                    </div>


                    {/* PATIENTS */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        py-4
                    ">

                        <div>

                            <p className="
                                font-medium
                                text-slate-900
                            ">
                                Patient Notifications
                            </p>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">
                                Receive important patient updates.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                toggleNotification(
                                    "patients"
                                )
                            }
                            className={`
                                w-12
                                h-6
                                rounded-full
                                relative
                                transition
                                ${
                                    notifications.patients
                                        ? "bg-blue-600"
                                        : "bg-slate-300"
                                }
                            `}
                        >

                            <span
                                className={`
                                    absolute
                                    top-1
                                    w-4
                                    h-4
                                    bg-white
                                    rounded-full
                                    transition
                                    ${
                                        notifications.patients
                                            ? "left-7"
                                            : "left-1"
                                    }
                                `}
                            />

                        </button>

                    </div>

                </div>


                {/* -------------------------------------- */}
                {/* SECURITY */}
                {/* -------------------------------------- */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                    mb-6
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        text-slate-900
                    ">
                        Security
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                        mb-6
                    ">
                        Manage your account security.
                    </p>


                    <div className="
                        border
                        border-slate-200
                        rounded-xl
                        p-5
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    font-medium
                                    text-slate-900
                                ">
                                    Password
                                </p>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">
                                    Update your account password.
                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="
                                    border
                                    border-slate-200
                                    px-4
                                    py-2
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    hover:bg-slate-50
                                "
                            >
                                {showPassword
                                    ? "Cancel"
                                    : "Change Password"}
                            </button>

                        </div>


                        {showPassword && (

                            <div className="
                                mt-6
                                space-y-4
                            ">

                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-xl
                                        px-4
                                        py-3
                                    "
                                />

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-xl
                                        px-4
                                        py-3
                                    "
                                />

                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="
                                        w-full
                                        border
                                        border-slate-200
                                        rounded-xl
                                        px-4
                                        py-3
                                    "
                                />

                                <button
                                    type="button"
                                    className="
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        px-5
                                        py-3
                                        rounded-xl
                                        font-medium
                                    "
                                >
                                    Update Password
                                </button>

                            </div>

                        )}

                    </div>

                </div>


                {/* -------------------------------------- */}
                {/* ACCOUNT */}
                {/* -------------------------------------- */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                        text-slate-900
                    ">
                        Account
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                        mb-6
                    ">
                        Manage your MedChain account.
                    </p>


                    <button
                        type="button"
                        className="
                            border
                            border-red-200
                            text-red-600
                            hover:bg-red-50
                            px-5
                            py-3
                            rounded-xl
                            font-medium
                        "
                    >
                        Log Out
                    </button>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default DoctorSettings;