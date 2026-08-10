import { useNavigate } from "react-router-dom";

function OrganizationCard({ organization }) {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        {organization.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {organization.type}
                    </p>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-2xl">
                    🏥
                </div>

            </div>

            <div className="mt-6 space-y-2">

                <p>
                    <span className="font-semibold">
                        Registration:
                    </span>{" "}
                    {organization.registration_no}
                </p>

                <p>
                    <span className="font-semibold">
                        Phone:
                    </span>{" "}
                    {organization.phone || "--"}
                </p>

                <p>
                    <span className="font-semibold">
                        Address:
                    </span>{" "}
                    {organization.address || "--"}
                </p>

            </div>

            <button
                onClick={() =>
                    navigate(`/organization/${organization.id}`)
                }
                className="mt-6 w-full bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700 transition"
            >
                View Details
            </button>

        </div>
    );
}

export default OrganizationCard;