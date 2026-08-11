import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Phone, Droplets, Ruler, Weight, CreditCard, Calendar } from "lucide-react";
import { getPatient } from "../../services/patientService";

function PatientProfile() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    const loadPatient = async () => {

        try {

            const data = await getPatient(id);

            setPatient(data);

        } catch (error) {

            console.error("Error fetching patient:", error);

        }

    };

    useEffect(() => {

        loadPatient();

    }, []);

    if (!patient) {

        return (

            <div className="p-10 text-xl">

                Loading Patient...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="bg-white rounded-3xl shadow-sm p-8">

                <h1 className="text-4xl font-bold mb-8">

                    Patient Profile

                </h1>

                <div className="grid grid-cols-2 gap-8">

                    <InfoCard
                        icon={<User />}
                        title="Name"
                        value={patient.name}
                    />

                    <InfoCard
                        icon={<CreditCard />}
                        title="Aadhaar"
                        value={patient.aadhaar_number}
                    />

                    <InfoCard
                        icon={<Phone />}
                        title="Phone"
                        value={patient.phone}
                    />

                    <InfoCard
                        icon={<Calendar />}
                        title="Date of Birth"
                        value={patient.dob}
                    />

                    <InfoCard
                        icon={<Droplets />}
                        title="Blood Group"
                        value={patient.blood_group}
                    />

                    <InfoCard
                        icon={<User />}
                        title="Gender"
                        value={patient.gender}
                    />

                    <InfoCard
                        icon={<Ruler />}
                        title="Height"
                        value={`${patient.height} cm`}
                    />

                    <InfoCard
                        icon={<Weight />}
                        title="Weight"
                        value={`${patient.weight} kg`}
                    />

                </div>

            </div>

        </div>

    );

}

function InfoCard({ icon, title, value }) {

    return (

        <div className="border rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-3 text-blue-600">

                {icon}

                <h2 className="font-semibold">

                    {title}

                </h2>

            </div>

            <p className="text-xl font-bold text-slate-700">

                {value}

            </p>

        </div>

    );

}

export default PatientProfile;