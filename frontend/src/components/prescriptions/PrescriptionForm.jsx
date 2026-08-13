import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllPatients } from "../../services/patientService";
import { getAllOrganizations } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";
import { getConsultationsByPatient } from "../../services/consultationService";
import { getAllMedicines } from "../../services/medicineService";
import { createPrescription } from "../../services/prescriptionService";

import PrescriptionInfo from "./PrescriptionInfo";
import MedicineSection from "./MedicineSection";
import NotesSection from "./NotesSection";

function PrescriptionForm() {

    const navigate = useNavigate();

    // Dropdown Data
    const [patients, setPatients] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [medicines, setMedicines] = useState([]);

    // Selected Values
    const [patientId, setPatientId] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [consultationId, setConsultationId] = useState("");

    const [notes, setNotes] = useState("");

    const [prescriptionMedicines, setPrescriptionMedicines] = useState([
        {
            medicine_id: "",
            dosage: "",
            quantity: 1,
            instructions: ""
        }
    ]);

    useEffect(() => {

        loadInitialData();

    }, []);

    const loadInitialData = async () => {

        try {

            const patientData = await getAllPatients();
            setPatients(patientData);

            const organizationData = await getAllOrganizations();
            setOrganizations(organizationData);

            const medicineData = await getAllMedicines();
            setMedicines(medicineData);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (organizationId) {

            loadDoctors();

        }

    }, [organizationId]);

    const loadDoctors = async () => {

        try {

            const data = await getDoctors(organizationId);

            setDoctors(data);

        }

        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        if (patientId) {

            loadConsultations();

        }

    }, [patientId]);

    const loadConsultations = async () => {

        try {

            const data = await getConsultationsByPatient(patientId);

            setConsultations(data);

        }

        catch (error) {

            console.error(error);

        }

    };

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

    const removeMedicine = (index) => {

        const updated = [...prescriptionMedicines];

        updated.splice(index, 1);

        setPrescriptionMedicines(updated);

    };

    const updateMedicine = (index, field, value) => {

        const updated = [...prescriptionMedicines];

        updated[index][field] = value;

        setPrescriptionMedicines(updated);

    };

    const handleSubmit = async () => {

        try {

            const payload = {

                patient_id: patientId,

                organization_id: organizationId,

                staff_id: doctorId,

                consultation_id: consultationId,

                notes,

                medicines: prescriptionMedicines

            };

            const response = await createPrescription(payload);

            alert("Prescription created successfully!");

            navigate(`/prescriptions/${response.id}`);

        }

        catch (error) {

            console.error(error);

            alert("Failed to create prescription.");

        }

    };

    return (

        <div className="space-y-8">

            <PrescriptionInfo

                patients={patients}
                organizations={organizations}
                doctors={doctors}
                consultations={consultations}

                patientId={patientId}
                organizationId={organizationId}
                doctorId={doctorId}
                consultationId={consultationId}

                setPatientId={setPatientId}
                setOrganizationId={setOrganizationId}
                setDoctorId={setDoctorId}
                setConsultationId={setConsultationId}

            />

            <MedicineSection

                medicines={medicines}

                prescriptionMedicines={prescriptionMedicines}

                addMedicine={addMedicine}

                updateMedicine={updateMedicine}

                removeMedicine={removeMedicine}

            />

            <NotesSection

                notes={notes}

                setNotes={setNotes}

            />

            <div className="flex justify-end">

                <button

                    onClick={handleSubmit}

                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition"

                >

                    Create Prescription

                </button>

            </div>

        </div>

    );

}

export default PrescriptionForm;