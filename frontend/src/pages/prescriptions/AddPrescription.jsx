import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Trash2,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

import {
    getAllMedicines
} from "../../services/medicineService";

import {
    getConsultationById
} from "../../services/consultationService";

import {
    createPrescription
} from "../../services/prescriptionService";


function AddPrescription() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const patientId =
        searchParams.get("patientId") || "";

    const organizationId =
        searchParams.get("organizationId") || "";

    const doctorId =
        searchParams.get("doctorId") || "";

    const consultationId =
        searchParams.get("consultationId") || "";

    const [medicines, setMedicines] = useState([]);
    const [consultation, setConsultation] = useState(null);

    const [items, setItems] = useState([
        {
            medicine_id: "",
            dosage: "",
            quantity: 1,
            instructions: ""
        }
    ]);

    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    useEffect(() => {

        loadData();

    }, [consultationId]);


    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const medicinesData =
                await getAllMedicines();

            setMedicines(medicinesData || []);


            if (!consultationId) {

                setError(
                    "No consultation was provided. Please complete the consultation first."
                );

                return;
            }


            const consultationData =
                await getConsultationById(
                    consultationId
                );

            setConsultation(
                consultationData
            );

        } catch (error) {

            console.error(
                "Failed to load prescription data:",
                error
            );

            const detail =
                error.response?.data?.detail;

            setError(
                typeof detail === "string"
                    ? detail
                    : "Unable to load prescription data."
            );

        } finally {

            setLoading(false);

        }

    };


    const updateItem = (
        index,
        field,
        value
    ) => {

        setItems((current) =>
            current.map(
                (item, itemIndex) =>
                    itemIndex === index
                        ? {
                            ...item,
                            [field]: value
                        }
                        : item
            )
        );

    };


    const addMedicine = () => {

        setItems((current) => [
            ...current,
            {
                medicine_id: "",
                dosage: "",
                quantity: 1,
                instructions: ""
            }
        ]);

    };


    const removeMedicine = (index) => {

        setItems((current) =>
            current.length === 1
                ? current
                : current.filter(
                    (_, itemIndex) =>
                        itemIndex !== index
                )
        );

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!patientId ||
            !organizationId ||
            !doctorId ||
            !consultationId
        ) {

            setError(
                "Required prescription information is missing."
            );

            return;
        }


        const invalidItem =
            items.some(
                (item) =>
                    !item.medicine_id ||
                    !item.dosage.trim() ||
                    Number(item.quantity) < 1 ||
                    !item.instructions.trim()
            );

        if (invalidItem) {

            setError(
                "Please complete all medicine fields."
            );

            return;
        }


        try {

            setSaving(true);

            const payload = {

                patient_id: patientId,

                organization_id:
                    organizationId,

                staff_id: doctorId,

                consultation_id:
                    consultationId,

                notes:
                    notes.trim() || null,

                medicines:
                    items.map((item) => ({
                        medicine_id:
                            item.medicine_id,

                        dosage:
                            item.dosage.trim(),

                        quantity:
                            Number(item.quantity),

                        instructions:
                            item.instructions.trim()
                    }))

            };


            console.log(
                "PRESCRIPTION PAYLOAD:",
                payload
            );


            const result =
                await createPrescription(
                    payload
                );


            const prescriptionId =
                result?.prescription?.id ||
                result?.id;


            if (prescriptionId) {

                navigate(
                    `/prescriptions/${prescriptionId}`
                );

            } else {

                navigate(
                    `/prescriptions?doctorId=${doctorId}`
                );

            }

        } catch (error) {

            console.error(
                "Failed to create prescription:",
                error
            );

            const detail =
                error.response?.data?.detail;

            if (Array.isArray(detail)) {

                setError(
                    detail
                        .map((item) => item.msg)
                        .join(", ")
                );

            } else if (
                typeof detail === "string"
            ) {

                setError(detail);

            } else {

                setError(
                    "Failed to create prescription."
                );

            }

        } finally {

            setSaving(false);

        }

    };


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
                    Loading prescription...
                </p>
            </div>
        );

    }


    return (

        <div className="
            min-h-screen
            bg-slate-50
            py-10
            px-4
        ">

            <div className="
                max-w-5xl
                mx-auto
            ">

                <button
                    onClick={() =>
                        navigate("/appointments")
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-500
                        hover:text-slate-900
                        mb-6
                    "
                >
                    <ArrowLeft size={17} />
                    Back to Appointments
                </button>


                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    border-slate-200
                    p-8
                ">

                    <div className="mb-8">

                        <h1 className="
                            text-3xl
                            font-bold
                            text-slate-900
                        ">
                            Create Prescription
                        </h1>

                        <p className="
                            text-slate-500
                            mt-2
                        ">
                            Add the medicines prescribed for this consultation.
                        </p>

                    </div>


                    {error && (
                        <div className="
                            flex
                            items-start
                            gap-2
                            bg-red-50
                            border
                            border-red-200
                            text-red-700
                            rounded-xl
                            p-4
                            mb-6
                            text-sm
                        ">
                            <AlertCircle
                                size={18}
                                className="mt-0.5 shrink-0"
                            />
                            <span>{error}</span>
                        </div>
                    )}


                    {/* CONSULTATION */}

                    <div className="
                        border
                        border-slate-200
                        rounded-2xl
                        p-5
                        mb-8
                        bg-slate-50
                    ">

                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-900
                            mb-4
                        ">
                            Consultation
                        </h2>

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        ">

                            <div>
                                <p className="
                                    text-xs
                                    text-slate-500
                                ">
                                    Diagnosis
                                </p>

                                <p className="
                                    mt-1
                                    font-medium
                                    text-slate-900
                                ">
                                    {consultation?.diagnosis || "--"}
                                </p>
                            </div>

                            <div>
                                <p className="
                                    text-xs
                                    text-slate-500
                                ">
                                    Consultation ID
                                </p>

                                <p className="
                                    mt-1
                                    font-medium
                                    text-slate-900
                                    break-all
                                ">
                                    {consultationId}
                                </p>
                            </div>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

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
                                    Add the medicines prescribed for this patient.
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
                                "
                            >
                                <Plus size={18} />
                                Add Medicine
                            </button>

                        </div>


                        <div className="space-y-5">

                            {items.map(
                                (item, index) => (

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
                                            mb-5
                                        ">

                                            <h3 className="
                                                font-semibold
                                                text-slate-900
                                            ">
                                                Medicine {index + 1}
                                            </h3>

                                            {items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeMedicine(index)
                                                    }
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-1
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
                                            gap-5
                                        ">

                                            <div>
                                                <label className="
                                                    block
                                                    text-sm
                                                    font-medium
                                                    text-slate-700
                                                    mb-2
                                                ">
                                                    Medicine
                                                </label>

                                                <select
                                                    value={item.medicine_id}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "medicine_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        border-slate-200
                                                        rounded-xl
                                                        p-3
                                                        bg-white
                                                    "
                                                >

                                                    <option value="">
                                                        Select Medicine
                                                    </option>

                                                    {medicines.map(
                                                        (medicine) => (
                                                            <option
                                                                key={medicine.id}
                                                                value={medicine.id}
                                                            >
                                                                {medicine.name}
                                                            </option>
                                                        )
                                                    )}

                                                </select>

                                            </div>


                                            <div>
                                                <label className="
                                                    block
                                                    text-sm
                                                    font-medium
                                                    text-slate-700
                                                    mb-2
                                                ">
                                                    Dosage
                                                </label>

                                                <input
                                                    type="text"
                                                    value={item.dosage}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "dosage",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. 500 mg"
                                                    className="
                                                        w-full
                                                        border
                                                        border-slate-200
                                                        rounded-xl
                                                        p-3
                                                        bg-white
                                                    "
                                                />
                                            </div>


                                            <div>
                                                <label className="
                                                    block
                                                    text-sm
                                                    font-medium
                                                    text-slate-700
                                                    mb-2
                                                ">
                                                    Quantity
                                                </label>

                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full
                                                        border
                                                        border-slate-200
                                                        rounded-xl
                                                        p-3
                                                        bg-white
                                                    "
                                                />
                                            </div>


                                            <div>
                                                <label className="
                                                    block
                                                    text-sm
                                                    font-medium
                                                    text-slate-700
                                                    mb-2
                                                ">
                                                    Instructions
                                                </label>

                                                <input
                                                    type="text"
                                                    value={item.instructions}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            "instructions",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="e.g. Take after food"
                                                    className="
                                                        w-full
                                                        border
                                                        border-slate-200
                                                        rounded-xl
                                                        p-3
                                                        bg-white
                                                    "
                                                />
                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>


                        <div className="mt-8">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-slate-700
                                mb-2
                            ">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(e) =>
                                    setNotes(e.target.value)
                                }
                                rows={5}
                                placeholder="Additional instructions for the patient..."
                                className="
                                    w-full
                                    border
                                    border-slate-200
                                    rounded-xl
                                    p-4
                                    resize-none
                                "
                            />

                        </div>


                        <div className="
                            flex
                            flex-col-reverse
                            md:flex-row
                            gap-4
                            mt-8
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/appointments")
                                }
                                className="
                                    md:w-1/3
                                    px-5
                                    py-3
                                    rounded-xl
                                    border
                                    border-slate-200
                                    text-slate-700
                                    font-medium
                                    hover:bg-slate-50
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >
                                <ArrowLeft size={18} />
                                Back to Appointments
                            </button>


                            <button
                                type="submit"
                                disabled={
                                    saving ||
                                    !consultationId
                                }
                                className="
                                    md:flex-1
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-green-600
                                    text-white
                                    font-medium
                                    hover:bg-green-700
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >
                                <CheckCircle2 size={18} />

                                {saving
                                    ? "Creating Prescription..."
                                    : "Create Prescription"
                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}


export default AddPrescription;