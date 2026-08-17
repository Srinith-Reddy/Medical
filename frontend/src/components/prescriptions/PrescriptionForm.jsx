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


function PrescriptionForm() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();


    // --------------------------------------------------
    // URL PARAMETERS
    // --------------------------------------------------

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
    // SELECTED APPOINTMENT DATA
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
    // PRESCRIPTION DATA
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
    // UI STATE
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
    // LOAD DATA
    // --------------------------------------------------

    useEffect(() => {

        loadInitialData();

    }, []);


    const loadInitialData = async () => {

        try {

            setLoading(true);
            setError("");


            // ------------------------------------------
            // Load basic data
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
            // Appointment is required
            // ------------------------------------------

            if (!appointmentId) {

                setError(
                    "Appointment information is missing."
                );

                return;

            }


            // ------------------------------------------
            // Get appointment
            // ------------------------------------------

            const appointment =
                await getAppointmentById(
                    appointmentId
                );


            console.log(
                "Prescription appointment:",
                appointment
            );


            // ------------------------------------------
            // Get appointment IDs
            // ------------------------------------------

            const appointmentPatientId =
                appointment.patient_id ||
                urlPatientId ||
                "";


            const appointmentOrganizationId =
                appointment.organization_id ||
                "";


            const appointmentDoctorId =
                appointment.doctor_id ||
                "";


            setPatientId(
                appointmentPatientId
            );


            setOrganizationId(
                appointmentOrganizationId
            );


            setDoctorId(
                appointmentDoctorId
            );


            // ------------------------------------------
            // Get doctors
            // ------------------------------------------

            if (appointmentOrganizationId) {

                const doctorsData =
                    await getDoctors(
                        appointmentOrganizationId
                    );


                setDoctors(
                    Array.isArray(doctorsData)
                        ? doctorsData
                        : []
                );

            }


            // ------------------------------------------
            // Get consultations
            // ------------------------------------------

            if (appointmentPatientId) {

                const consultationsData =
                    await getConsultationsByPatient(
                        appointmentPatientId
                    );


                const consultationList =
                    Array.isArray(consultationsData)
                        ? consultationsData
                        : [];


                setConsultations(
                    consultationList
                );


                // --------------------------------------
                // Find consultation for appointment
                // --------------------------------------

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
    // FIND SELECTED OBJECTS
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
                (_, medicineIndex) =>
                    medicineIndex !== index
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
                (medicine, medicineIndex) => {

                    if (medicineIndex !== index) {
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
    // SUBMIT PRESCRIPTION
    // --------------------------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // ----------------------------------------------
        // Basic validation
        // ----------------------------------------------

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


        // ----------------------------------------------
        // Validate medicines
        // ----------------------------------------------

        for (
            const medicine
            of prescriptionMedicines
        ) {

            if (!medicine.medicine_id) {

                setError(
                    "Please select a medicine for every medicine entry."
                );

                return;

            }


            if (!medicine.dosage.trim()) {

                setError(
                    "Please enter the dosage for every medicine."
                );

                return;

            }


            if (
                !medicine.quantity ||
                Number(medicine.quantity) <= 0
            ) {

                setError(
                    "Medicine quantity must be greater than 0."
                );

                return;

            }


            if (!medicine.instructions.trim()) {

                setError(
                    "Please enter instructions for every medicine."
                );

                return;

            }

        }


        try {

            setSubmitting(true);


            // ------------------------------------------
            // Prepare API data
            // ------------------------------------------

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


            // ------------------------------------------
            // CREATE PRESCRIPTION
            // ------------------------------------------

            await createPrescription(
                prescriptionData
            );


            setSuccess(
                "Prescription created successfully."
            );


            // ------------------------------------------
            // RETURN TO APPOINTMENTS
            // ------------------------------------------

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
                "Failed to create prescription. Please try again."
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
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-gray-200
                p-8
            ">

                <p className="text-gray-500">
                    Loading prescription information...
                </p>

            </div>

        );

    }


    // --------------------------------------------------
    // ERROR WHILE LOADING
    // --------------------------------------------------

    if (error && !patientId) {

        return (

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                border-red-200
                p-8
            ">

                <h2 className="
                    text-xl
                    font-semibold
                    text-gray-900
                ">
                    Unable to create prescription
                </h2>


                <p className="
                    text-red-600
                    mt-2
                ">
                    {error}
                </p>


                <button
                    type="button"
                    onClick={() =>
                        navigate("/appointments")
                    }
                    className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-3
                        rounded-xl
                        bg-slate-900
                        text-white
                        font-medium
                        hover:bg-slate-800
                        transition
                    "
                >

                    <ArrowLeft size={18} />

                    Back to Appointments

                </button>

            </div>

        );

    }


    // --------------------------------------------------
    // FORM
    // --------------------------------------------------

    return (

        <div className="
            min-h-screen
            bg-slate-50
            p-6
        ">

            <div className="
                max-w-4xl
                mx-auto
            ">


                {/* ---------------------------------- */}
                {/* TOP BAR */}
                {/* ---------------------------------- */}

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-6
                ">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/appointments")
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-slate-600
                            hover:text-slate-900
                            transition
                        "
                    >

                        <ArrowLeft size={18} />

                        Back to Appointments

                    </button>

                </div>


                {/* ---------------------------------- */}
                {/* MAIN CARD */}
                {/* ---------------------------------- */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    border-slate-200
                    p-8
                ">


                    {/* HEADER */}

                    <div className="mb-8">

                        <div className="
                            flex
                            items-center
                            gap-3
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

                                    Create a prescription for
                                    this patient's consultation.

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* PATIENT */}
                    {/* -------------------------------- */}

                    <div className="mb-6">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-medium
                            text-slate-700
                        ">

                            Patient

                        </label>


                        <div className="
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            bg-slate-50
                        ">

                            <p className="
                                font-semibold
                                text-slate-900
                            ">

                                {selectedPatient?.name ||
                                    "Patient information unavailable"
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


                    {/* -------------------------------- */}
                    {/* ORGANIZATION */}
                    {/* -------------------------------- */}

                    <div className="mb-6">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-medium
                            text-slate-700
                        ">

                            Organization

                        </label>


                        <div className="
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            bg-slate-50
                        ">

                            <p className="
                                font-semibold
                                text-slate-900
                            ">

                                {selectedOrganization?.name ||
                                    "Organization information unavailable"
                                }

                            </p>

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* DOCTOR */}
                    {/* -------------------------------- */}

                    <div className="mb-8">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-medium
                            text-slate-700
                        ">

                            Doctor

                        </label>


                        <div className="
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            bg-slate-50
                        ">

                            <p className="
                                font-semibold
                                text-slate-900
                            ">

                                {selectedDoctor?.name ||
                                    "Doctor information unavailable"
                                }

                            </p>

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* CONSULTATION */}
                    {/* -------------------------------- */}

                    <div className="mb-8">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-medium
                            text-slate-700
                        ">

                            Consultation

                        </label>


                        <div className="
                            border
                            border-slate-200
                            rounded-xl
                            p-4
                            bg-slate-50
                        ">

                            {selectedConsultation ? (

                                <>

                                    <p className="
                                        font-semibold
                                        text-slate-900
                                    ">

                                        Consultation

                                    </p>


                                    <p className="
                                        text-sm
                                        text-slate-500
                                        mt-1
                                    ">

                                        Consultation ID:{" "}
                                        {consultationId}

                                    </p>

                                </>

                            ) : (

                                <p className="
                                    text-sm
                                    text-yellow-700
                                ">

                                    No consultation linked to
                                    this appointment was found.

                                </p>

                            )}

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* DIVIDER */}
                    {/* -------------------------------- */}

                    <div className="
                        border-t
                        border-slate-200
                        my-8
                    " />


                    {/* -------------------------------- */}
                    {/* MEDICINES */}
                    {/* -------------------------------- */}

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
                                    during the consultation.

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={addMedicine}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2.5
                                    rounded-xl
                                    bg-green-50
                                    text-green-700
                                    font-medium
                                    hover:bg-green-100
                                    transition
                                "
                            >

                                <Plus size={18} />

                                Add Medicine

                            </button>

                        </div>


                        {/* MEDICINE ENTRIES */}

                        <div className="
                            space-y-5
                        ">

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
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        text-sm
                                                        text-red-600
                                                        hover:text-red-700
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
                                                    text-slate-700
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
                                                        border-slate-300
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        text-slate-900
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-green-500
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
                                                    text-slate-700
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
                                                        border-slate-300
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-green-500
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
                                                    text-slate-700
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
                                                        border-slate-300
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-green-500
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
                                                    text-slate-700
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
                                                        border-slate-300
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        bg-white
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-green-500
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* -------------------------------- */}
                    {/* NOTES */}
                    {/* -------------------------------- */}

                    <div className="mt-8">

                        <label className="
                            block
                            mb-2
                            text-sm
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
                            placeholder="Add any additional instructions or notes..."
                            className="
                                w-full
                                border
                                border-slate-300
                                rounded-xl
                                px-4
                                py-3
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                            "
                        />

                    </div>


                    {/* -------------------------------- */}
                    {/* ERROR */}
                    {/* -------------------------------- */}

                    {error && (

                        <div className="
                            mt-6
                            rounded-xl
                            bg-red-50
                            border
                            border-red-200
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


                    {/* -------------------------------- */}
                    {/* SUCCESS */}
                    {/* -------------------------------- */}

                    {success && (

                        <div className="
                            mt-6
                            rounded-xl
                            bg-green-50
                            border
                            border-green-200
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


                    {/* -------------------------------- */}
                    {/* ACTIONS */}
                    {/* -------------------------------- */}

                    <div className="
                        flex
                        flex-col-reverse
                        sm:flex-row
                        gap-3
                        mt-8
                    ">


                        {/* BACK */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/appointments")
                            }
                            disabled={submitting}
                            className="
                                sm:w-1/3
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                border
                                border-slate-300
                                text-slate-700
                                rounded-xl
                                py-3.5
                                font-medium
                                hover:bg-slate-50
                                transition
                                disabled:opacity-50
                            "
                        >

                            <ArrowLeft size={18} />

                            Back to Appointments

                        </button>


                        {/* CREATE */}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                submitting ||
                                !consultationId
                            }
                            className="
                                flex-1
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                bg-green-600
                                text-white
                                rounded-xl
                                py-3.5
                                font-semibold
                                hover:bg-green-700
                                transition
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


export default PrescriptionForm;