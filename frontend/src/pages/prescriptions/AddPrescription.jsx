import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Plus,
    Trash2,
    ArrowLeft,
    FileText
} from "lucide-react";

import { getAllPatients } from "../../services/patientService";
import { getAllOrganizations } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";
import { getConsultationsByPatient } from "../../services/consultationService";
import { getAllMedicines } from "../../services/medicineService";

import {
    getAppointmentById
} from "../../services/appointmentService";

import {
    createPrescription
} from "../../services/prescriptionService";


function AddPrescription() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const appointmentId =
        searchParams.get("appointmentId");

    const urlPatientId =
        searchParams.get("patientId");


    // --------------------------------------------------
    // DATA
    // --------------------------------------------------

    const [patients, setPatients] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [medicines, setMedicines] = useState([]);


    // --------------------------------------------------
    // APPOINTMENT INFORMATION
    // --------------------------------------------------

    const [patientId, setPatientId] =
        useState(urlPatientId || "");

    const [organizationId, setOrganizationId] =
        useState("");

    const [doctorId, setDoctorId] =
        useState("");

    const [consultationId, setConsultationId] =
        useState("");


    // --------------------------------------------------
    // PRESCRIPTION
    // --------------------------------------------------

    const [prescriptionMedicines, setPrescriptionMedicines] =
        useState([
            {
                medicine_id: "",
                dosage: "",
                quantity: 1,
                instructions: ""
            }
        ]);

    const [notes, setNotes] =
        useState("");


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // --------------------------------------------------
    // LOAD EVERYTHING
    // --------------------------------------------------

    useEffect(() => {

        loadData();

    }, []);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");


            // ------------------------------------------
            // Basic data
            // ------------------------------------------

            const [
                patientsData,
                organizationsData,
                medicinesData
            ] = await Promise.all([
                getAllPatients(),
                getAllOrganizations(),
                getAllMedicines()
            ]);


            setPatients(
                Array.isArray(patientsData)
                    ? patientsData
                    : []
            );

            setOrganizations(
                Array.isArray(organizationsData)
                    ? organizationsData
                    : []
            );

            setMedicines(
                Array.isArray(medicinesData)
                    ? medicinesData
                    : []
            );


            // ------------------------------------------
            // Appointment
            // ------------------------------------------

            if (!appointmentId) {

                setError(
                    "Appointment information is missing."
                );

                return;

            }


            const appointment =
                await getAppointmentById(
                    appointmentId
                );


            console.log(
                "Prescription appointment:",
                appointment
            );


            // ------------------------------------------
            // Get IDs from appointment
            // ------------------------------------------

            const currentPatientId =
                appointment.patient_id ||
                urlPatientId ||
                "";

            const currentOrganizationId =
                appointment.organization_id ||
                "";

            const currentDoctorId =
                appointment.doctor_id ||
                "";


            setPatientId(
                currentPatientId
            );

            setOrganizationId(
                currentOrganizationId
            );

            setDoctorId(
                currentDoctorId
            );


            // ------------------------------------------
            // Doctors
            // ------------------------------------------

            if (currentOrganizationId) {

                const doctorsData =
                    await getDoctors(
                        currentOrganizationId
                    );

                setDoctors(
                    Array.isArray(doctorsData)
                        ? doctorsData
                        : []
                );

            }


            // ------------------------------------------
            // Consultations
            // ------------------------------------------

            if (currentPatientId) {

                const consultationsData =
                    await getConsultationsByPatient(
                        currentPatientId
                    );

                const consultationList =
                    Array.isArray(consultationsData)
                        ? consultationsData
                        : [];


                setConsultations(
                    consultationList
                );


                const matchingConsultation =
                    consultationList.find(
                        (consultation) =>
                            consultation.appointment_id ===
                            appointmentId
                    );


                if (matchingConsultation) {

                    setConsultationId(
                        matchingConsultation.id
                    );

                }

            }

        } catch (error) {

            console.error(
                "Failed to load prescription data:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Unable to load prescription information."
            );

        } finally {

            setLoading(false);

        }

    };


    // --------------------------------------------------
    // SELECTED OBJECTS
    // --------------------------------------------------

    const selectedPatient =
        patients.find(
            (patient) =>
                patient.id === patientId
        );

    const selectedOrganization =
        organizations.find(
            (organization) =>
                organization.id === organizationId
        );

    const selectedDoctor =
        doctors.find(
            (doctor) =>
                doctor.id === doctorId
        );

    const selectedConsultation =
        consultations.find(
            (consultation) =>
                consultation.id === consultationId
        );


    // --------------------------------------------------
    // ADD MEDICINE
    // --------------------------------------------------

    const addMedicine = () => {

        setPrescriptionMedicines([
            ...prescriptionMedicines,
            {
                medicine_id: "",
                dosage: "",
                quantity: 1,
                instructions: ""
            }
        ]);

    };


    // --------------------------------------------------
    // REMOVE MEDICINE
    // --------------------------------------------------

    const removeMedicine = (index) => {

        if (prescriptionMedicines.length === 1) {
            return;
        }

        setPrescriptionMedicines(
            prescriptionMedicines.filter(
                (_, i) => i !== index
            )
        );

    };


    // --------------------------------------------------
    // UPDATE MEDICINE
    // --------------------------------------------------

    const updateMedicine = (
        index,
        field,
        value
    ) => {

        setPrescriptionMedicines(
            prescriptionMedicines.map(
                (medicine, i) => {

                    if (i !== index) {
                        return medicine;
                    }

                    return {
                        ...medicine,
                        [field]: value
                    };

                }
            )
        );

    };


    // --------------------------------------------------
    // SUBMIT
    // --------------------------------------------------

    const handleSubmit = async () => {

        setError("");
        setSuccess("");


        if (!patientId) {

            setError(
                "Patient information is missing."
            );

            return;

        }


        if (!organizationId) {

            setError(
                "Organization information is missing."
            );

            return;

        }


        if (!doctorId) {

            setError(
                "Doctor information is missing."
            );

            return;

        }


        if (!consultationId) {

            setError(
                "No consultation is linked to this appointment."
            );

            return;

        }


        for (
            const medicine
            of prescriptionMedicines
        ) {

            if (!medicine.medicine_id) {

                setError(
                    "Please select a medicine."
                );

                return;

            }

            if (!medicine.dosage.trim()) {

                setError(
                    "Please enter the dosage."
                );

                return;

            }

            if (
                !medicine.quantity ||
                Number(medicine.quantity) <= 0
            ) {

                setError(
                    "Quantity must be greater than 0."
                );

                return;

            }

            if (!medicine.instructions.trim()) {

                setError(
                    "Please enter medicine instructions."
                );

                return;

            }

        }


        try {

            setSubmitting(true);


            const prescriptionData = {

                patient_id: patientId,

                organization_id: organizationId,

                staff_id: doctorId,

                consultation_id: consultationId,

                notes:
                    notes.trim() || null,

                medicines:
                    prescriptionMedicines.map(
                        (medicine) => ({
                            medicine_id:
                                medicine.medicine_id,

                            dosage:
                                medicine.dosage.trim(),

                            quantity:
                                Number(
                                    medicine.quantity
                                ),

                            instructions:
                                medicine.instructions.trim()
                        })
                    )

            };


            console.log(
                "Creating prescription:",
                prescriptionData
            );


            await createPrescription(
                prescriptionData
            );


            setSuccess(
                "Prescription created successfully."
            );


            setTimeout(() => {

                navigate("/appointments");

            }, 1000);

        } catch (error) {

            console.error(
                "Failed to create prescription:",
                error
            );

            setError(
                error.response?.data?.detail ||
                "Failed to create prescription."
            );

        } finally {

            setSubmitting(false);

        }

    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
            ">

                <p className="text-slate-500">
                    Loading prescription information...
                </p>

            </div>

        );

    }


    // --------------------------------------------------
    // PAGE
    // --------------------------------------------------

    return (

        <div className="
            min-h-screen
            bg-slate-50
            px-6
            py-10
        ">

            <div className="
                max-w-4xl
                mx-auto
            ">


                {/* BACK */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/appointments")
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-slate-600
                        hover:text-slate-900
                        mb-6
                    "
                >

                    <ArrowLeft size={18} />

                    Back to Appointments

                </button>


                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm
                    p-8
                ">


                    {/* HEADER */}

                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-8
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-green-50
                            flex
                            items-center
                            justify-center
                        ">

                            <FileText
                                size={22}
                                className="text-green-600"
                            />

                        </div>


                        <div>

                            <h1 className="
                                text-3xl
                                font-bold
                                text-slate-900
                            ">

                                Create Prescription

                            </h1>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">

                                Prescription for this consultation

                            </p>

                        </div>

                    </div>


                    {/* PATIENT */}

                    <div className="mb-6">

                        <label className="
                            block
                            mb-2
                            font-medium
                            text-slate-700
                        ">

                            Patient

                        </label>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                        ">

                            <p className="
                                font-semibold
                                text-slate-900
                            ">

                                {selectedPatient?.name ||
                                    "Patient"
                                }

                            </p>

                            <p className="
                                text-sm
                                text-slate-500
                                mt-1
                            ">

                                Patient ID: {patientId}

                            </p>

                        </div>

                    </div>


                    {/* ORGANIZATION */}

                    <div className="mb-6">

                        <label className="
                            block
                            mb-2
                            font-medium
                            text-slate-700
                        ">

                            Organization

                        </label>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                        ">

                            {selectedOrganization?.name ||
                                "Organization"
                            }

                        </div>

                    </div>


                    {/* DOCTOR */}

                    <div className="mb-6">

                        <label className="
                            block
                            mb-2
                            font-medium
                            text-slate-700
                        ">

                            Doctor

                        </label>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                        ">

                            {selectedDoctor?.name ||
                                "Doctor"
                            }

                        </div>

                    </div>


                    {/* CONSULTATION */}

                    <div className="mb-8">

                        <label className="
                            block
                            mb-2
                            font-medium
                            text-slate-700
                        ">

                            Consultation

                        </label>


                        <div className="
                            bg-slate-50
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                        ">

                            {selectedConsultation
                                ? `Consultation ID: ${selectedConsultation.id}`
                                : "No consultation found"
                            }

                        </div>

                    </div>


                    {/* DIVIDER */}

                    <div className="
                        border-t
                        border-slate-200
                        my-8
                    " />


                    {/* MEDICINES */}

                    <div>

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-5
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-slate-900
                                ">

                                    Medicines

                                </h2>

                                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-1
                                ">

                                    Add the medicines prescribed
                                    for this patient.

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={addMedicine}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2.5
                                    rounded-xl
                                    bg-green-50
                                    text-green-700
                                    font-medium
                                    hover:bg-green-100
                                "
                            >

                                <Plus size={18} />

                                Add Medicine

                            </button>

                        </div>


                        <div className="space-y-5">

                            {prescriptionMedicines.map(
                                (medicine, index) => (

                                    <div
                                        key={index}
                                        className="
                                            border
                                            border-slate-200
                                            rounded-2xl
                                            p-5
                                            bg-slate-50
                                        "
                                    >

                                        <div className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-4
                                        ">

                                            <h3 className="
                                                font-semibold
                                                text-slate-900
                                            ">

                                                Medicine{" "}
                                                {index + 1}

                                            </h3>


                                            {prescriptionMedicines.length >
                                                1 && (

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeMedicine(index)
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-1
                                                        text-sm
                                                        text-red-600
                                                    "
                                                >

                                                    <Trash2 size={16} />

                                                    Remove

                                                </button>

                                            )}

                                        </div>


                                        <div className="
                                            grid
                                            grid-cols-1
                                            md:grid-cols-2
                                            gap-4
                                        ">


                                            {/* MEDICINE */}

                                            <div>

                                                <label className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                ">

                                                    Medicine

                                                </label>


                                                <select
                                                    value={
                                                        medicine.medicine_id
                                                    }
                                                    onChange={(e) =>
                                                        updateMedicine(
                                                            index,
                                                            "medicine_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        rounded-xl
                                                        p-3
                                                        bg-white
                                                    "
                                                >

                                                    <option value="">
                                                        Select Medicine
                                                    </option>


                                                    {medicines.map(
                                                        (item) => (

                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >

                                                                {item.name ||
                                                                    item.medicine_name ||
                                                                    item.id
                                                                }

                                                            </option>

                                                        )
                                                    )}

                                                </select>

                                            </div>


                                            {/* DOSAGE */}

                                            <div>

                                                <label className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                ">

                                                    Dosage

                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        medicine.dosage
                                                    }
                                                    onChange={(e) =>
                                                        updateMedicine(
                                                            index,
                                                            "dosage",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. 500 mg"
                                                    className="
                                                        w-full
                                                        border
                                                        rounded-xl
                                                        p-3
                                                    "
                                                />

                                            </div>


                                            {/* QUANTITY */}

                                            <div>

                                                <label className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                ">

                                                    Quantity

                                                </label>


                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={
                                                        medicine.quantity
                                                    }
                                                    onChange={(e) =>
                                                        updateMedicine(
                                                            index,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        rounded-xl
                                                        p-3
                                                    "
                                                />

                                            </div>


                                            {/* INSTRUCTIONS */}

                                            <div>

                                                <label className="
                                                    block
                                                    mb-2
                                                    text-sm
                                                    font-medium
                                                ">

                                                    Instructions

                                                </label>


                                                <input
                                                    type="text"
                                                    value={
                                                        medicine.instructions
                                                    }
                                                    onChange={(e) =>
                                                        updateMedicine(
                                                            index,
                                                            "instructions",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Take after food"
                                                    className="
                                                        w-full
                                                        border
                                                        rounded-xl
                                                        p-3
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* NOTES */}

                    <div className="mt-8">

                        <label className="
                            block
                            mb-2
                            font-medium
                            text-slate-700
                        ">

                            Notes

                        </label>


                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            rows={4}
                            placeholder="Additional notes..."
                            className="
                                w-full
                                border
                                rounded-xl
                                p-3
                                resize-none
                            "
                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="
                            mt-6
                            bg-red-50
                            border
                            border-red-200
                            rounded-xl
                            px-4
                            py-3
                        ">

                            <p className="
                                text-sm
                                text-red-700
                            ">

                                {error}

                            </p>

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="
                            mt-6
                            bg-green-50
                            border
                            border-green-200
                            rounded-xl
                            px-4
                            py-3
                        ">

                            <p className="
                                text-sm
                                text-green-700
                                font-medium
                            ">

                                {success}

                            </p>

                            <p className="
                                text-xs
                                text-green-600
                                mt-1
                            ">

                                Returning to appointments...

                            </p>

                        </div>

                    )}


                    {/* ACTIONS */}

                    <div className="
                        flex
                        gap-3
                        mt-8
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/appointments")
                            }
                            disabled={submitting}
                            className="
                                w-1/3
                                border
                                border-slate-300
                                text-slate-700
                                rounded-xl
                                py-3.5
                                font-medium
                                hover:bg-slate-50
                            "
                        >

                            <span className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                            ">

                                <ArrowLeft size={18} />

                                Back to Appointments

                            </span>

                        </button>


                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                submitting ||
                                !consultationId
                            }
                            className="
                                flex-1
                                bg-green-600
                                text-white
                                rounded-xl
                                py-3.5
                                font-semibold
                                hover:bg-green-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                            {submitting
                                ? "Creating Prescription..."
                                : "Create Prescription"
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default AddPrescription;