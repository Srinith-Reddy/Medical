import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatient } from "../../services/patientService";

function PatientProfile() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    const loadPatient = async () => {

        try {

            const data = await getPatient(id);

            setPatient(data);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        loadPatient();

    }, []);

    if(!patient){

        return <h2>Loading...</h2>;

    }

    return (

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-10">

            <h1 className="text-4xl font-bold">

                {patient.name}

            </h1>

            <div className="grid grid-cols-2 gap-8 mt-10">

                <div>

                    <p className="text-gray-500">
                        Aadhaar Number
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.aadhaar_number}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Phone
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.phone}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Gender
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.gender}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Blood Group
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.blood_group}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Height
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.height} cm
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Weight
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.weight} kg
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Date of Birth
                    </p>

                    <h3 className="text-xl font-semibold">
                        {patient.dob}
                    </h3>

                </div>

            </div>

        </div>

    );

}

export default PatientProfile;