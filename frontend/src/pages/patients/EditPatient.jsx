import DashboardLayout from "../../components/layout/DashboardLayout";
import EditPatientForm from "../../components/patient/EditPatientForm";

function EditPatient() {

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                    Edit Patient
                </h1>

                <p className="text-gray-500 mt-2">
                    Update patient information.
                </p>

            </div>

            <EditPatientForm />

        </DashboardLayout>

    );

}

export default EditPatient;