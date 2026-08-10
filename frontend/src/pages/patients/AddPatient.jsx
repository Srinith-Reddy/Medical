import DashboardLayout from "../../components/layout/DashboardLayout";
import PatientForm from "../../components/patient/PatientForm";

function AddPatient() {

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                    Add Patient
                </h1>

                <p className="text-gray-500 mt-2">
                    Register a new patient in the system.
                </p>

            </div>

            <PatientForm />

        </DashboardLayout>

    );

}

export default AddPatient;