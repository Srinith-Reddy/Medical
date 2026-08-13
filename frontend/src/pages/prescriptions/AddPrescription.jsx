import { useEffect, useState } from "react";

import { getAllPatients } from "../../services/patientService";
import { getAllOrganizations } from "../../services/organizationService";
import { getDoctors } from "../../services/doctorService";
import { getConsultationsByPatient } from "../../services/consultationService";
import { getAllMedicines } from "../../services/medicineService";

function PrescriptionForm() {

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

    useEffect(() => {

        loadInitialData();

    }, []);

    const loadInitialData = async () => {

        try {

            const patientsData = await getAllPatients();
            setPatients(patientsData);

            const organizationsData = await getAllOrganizations();
            setOrganizations(organizationsData);

            const medicinesData = await getAllMedicines();
            setMedicines(medicinesData);

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

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

            <h2 className="text-3xl font-bold mb-8">

                Create Prescription

            </h2>

            {/* Patient */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">

                    Patient

                </label>

                <select
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full border rounded-xl p-3"
                >

                    <option value="">
                        Select Patient
                    </option>

                    {patients.map((patient) => (

                        <option
                            key={patient.id}
                            value={patient.id}
                        >

                            {patient.name}

                        </option>

                    ))}

                </select>

            </div>

            {/* Organization */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">

                    Organization

                </label>

                <select
                    value={organizationId}
                    onChange={(e) => setOrganizationId(e.target.value)}
                    className="w-full border rounded-xl p-3"
                >

                    <option value="">
                        Select Organization
                    </option>

                    {organizations.map((organization) => (

                        <option
                            key={organization.id}
                            value={organization.id}
                        >

                            {organization.name}

                        </option>

                    ))}

                </select>

            </div>

            {/* Doctor */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">

                    Doctor

                </label>

                <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full border rounded-xl p-3"
                >

                    <option value="">
                        Select Doctor
                    </option>

                    {doctors.map((doctor) => (

                        <option
                            key={doctor.id}
                            value={doctor.id}
                        >

                            {doctor.name}

                        </option>

                    ))}

                </select>

            </div>

            {/* Consultation */}

            <div className="mb-6">

                <label className="block mb-2 font-medium">

                    Consultation

                </label>

                <select
                    value={consultationId}
                    onChange={(e) => setConsultationId(e.target.value)}
                    className="w-full border rounded-xl p-3"
                >

                    <option value="">
                        Select Consultation
                    </option>

                    {consultations.map((consultation) => (

                        <option
                            key={consultation.id}
                            value={consultation.id}
                        >

                            {consultation.id}

                        </option>

                    ))}

                </select>

            </div>

        </div>

    );

}

export default PrescriptionForm;