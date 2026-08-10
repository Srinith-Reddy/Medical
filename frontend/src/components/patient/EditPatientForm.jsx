import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPatient } from "../../services/patientService";
import PatientForm from "./PatientForm";

function EditPatientForm() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    const loadPatient = async () => {

        try {

            const data = await getPatient(id);

            setPatient(data);

        }

        catch (error) {

            console.error("Error loading patient:", error);

        }

    };

    useEffect(() => {

        loadPatient();

    }, []);

    if (!patient) {

        return (

            <div className="text-center py-20 text-xl">

                Loading Patient...

            </div>

        );

    }

    return (

        <PatientForm
            mode="edit"
            patient={patient}
        />

    );

}

export default EditPatientForm;