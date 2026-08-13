import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getOrganization } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";

function OrganizationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [organization, setOrganization] = useState(null);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ---------------------------------------------
    // LOAD ORGANIZATION + DOCTORS
    // ---------------------------------------------

    useEffect(() => {
        loadOrganizationDetails();
    }, [id]);


    const loadOrganizationDetails = async () => {

        try {

            setLoading(true);
            setError("");

            const organizationData = await getOrganization(id);

            setOrganization(organizationData);


            const doctorsData = await getDoctors(id);

            setDoctors(doctorsData);

        } catch (error) {

            console.error(
                "Failed to load organization details:",
                error
            );

            setError(
                "Unable to load organization details."
            );

        } finally {

            setLoading(false);

        }

    };


    // ---------------------------------------------
    // LOADING
    // ---------------------------------------------

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-100 p-8">

                <p className="text-slate-500">
                    Loading organization details...
                </p>

            </div>
        );

    }


    // ---------------------------------------------
    // ERROR
    // ---------------------------------------------

    if (error) {

        return (
            <div className="min-h-screen bg-slate-100 p-8">

                <div className="bg-white rounded-2xl border border-red-200 p-6">

                    <p className="text-red-600">
                        {error}
                    </p>

                </div>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-6xl mx-auto">


                {/* Back Button */}

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                    ← Back
                </button>


                {/* Organization Header */}

                <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8 mb-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-slate-500 uppercase tracking-wide">
                                Organization
                            </p>

                            <h1 className="text-4xl font-bold text-slate-900 mt-2">
                                {organization?.name}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                {organization?.type}
                            </p>

                        </div>


                        <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-3xl">
                            🏥
                        </div>

                    </div>


                    {/* Organization Information */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

                        <div className="bg-slate-50 rounded-2xl p-5">

                            <p className="text-sm text-slate-500">
                                Registration Number
                            </p>

                            <p className="font-semibold text-slate-900 mt-2">
                                {organization?.registration_no || "--"}
                            </p>

                        </div>


                        <div className="bg-slate-50 rounded-2xl p-5">

                            <p className="text-sm text-slate-500">
                                Phone
                            </p>

                            <p className="font-semibold text-slate-900 mt-2">
                                {organization?.phone || "--"}
                            </p>

                        </div>


                        <div className="bg-slate-50 rounded-2xl p-5">

                            <p className="text-sm text-slate-500">
                                Address
                            </p>

                            <p className="font-semibold text-slate-900 mt-2">
                                {organization?.address || "--"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Doctors */}

                <section>

                    <div className="mb-5">

                        <h2 className="text-2xl font-bold text-slate-900">
                            Doctors
                        </h2>

                        <p className="text-slate-500 mt-1">
                            Doctors associated with this organization
                        </p>

                    </div>


                    {doctors.length === 0 ? (

                        <div className="bg-white rounded-2xl border border-slate-200 p-6">

                            <p className="text-slate-500">
                                No doctors found for this organization.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {doctors.map((doctor) => (

                                <div
                                    key={doctor.id}
                                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
                                >

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                            {doctor.name
                                                ? doctor.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : "D"}
                                        </div>


                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                {doctor.name || "Doctor"}
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                Doctor
                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-5 space-y-2">

                                        {doctor.phone && (
                                            <p className="text-sm text-slate-600">
                                                <span className="font-medium">
                                                    Phone:
                                                </span>{" "}
                                                {doctor.phone}
                                            </p>
                                        )}

                                        {doctor.email && (
                                            <p className="text-sm text-slate-600">
                                                <span className="font-medium">
                                                    Email:
                                                </span>{" "}
                                                {doctor.email}
                                            </p>
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </div>

    );

}

export default OrganizationDetails;