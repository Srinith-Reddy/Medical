import DashboardLayout from "../../components/layout/DashboardLayout";
import MedicineForm from "../../components/medicines/MedicineForm";

function AddMedicine() {

    return (

        <DashboardLayout>

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-800">
                    Add Medicine
                </h1>

                <p className="text-gray-500 mt-2">
                    Register a new medicine into the hospital inventory.
                </p>

            </div>

            <MedicineForm />

        </DashboardLayout>

    );

}

export default AddMedicine;