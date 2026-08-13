import { useNavigate } from "react-router-dom";


function OrganizationCard({ organization }) {

    const navigate = useNavigate();


    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                p-5
                shadow-sm
                hover:shadow-md
                hover:border-blue-200
                transition
            "
        >

            {/* --------------------------------------------------
                HEADER
            -------------------------------------------------- */}

            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">

                <div>

                    <h2 className="
                        text-xl
                        font-bold
                        text-slate-900
                    ">
                        {organization.name || "Organization"}
                    </h2>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        {organization.type || "--"}
                    </p>

                </div>


                <div className="
                    w-12
                    h-12
                    rounded-xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    text-xl
                ">
                    🏥
                </div>

            </div>


            {/* --------------------------------------------------
                ORGANIZATION DETAILS
            -------------------------------------------------- */}

            <div className="
                mt-5
                space-y-3
            ">

                <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                ">

                    <span className="text-slate-500">
                        Registration
                    </span>

                    <span className="
                        font-medium
                        text-slate-800
                        text-right
                    ">
                        {organization.registration_no || "--"}
                    </span>

                </div>


                <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                ">

                    <span className="text-slate-500">
                        Phone
                    </span>

                    <span className="
                        font-medium
                        text-slate-800
                        text-right
                    ">
                        {organization.phone || "--"}
                    </span>

                </div>


                <div className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                ">

                    <span className="text-slate-500">
                        Address
                    </span>

                    <span className="
                        font-medium
                        text-slate-800
                        text-right
                        max-w-[60%]
                    ">
                        {organization.address || "--"}
                    </span>

                </div>

            </div>


            {/* --------------------------------------------------
                VIEW DETAILS
            -------------------------------------------------- */}

            <button
                onClick={() =>
                    navigate(
                        `/organization/${organization.id}`
                    )
                }
                className="
                    mt-5
                    w-full
                    rounded-xl
                    bg-blue-600
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    hover:bg-blue-700
                    transition
                "
            >
                View Details
            </button>

        </div>

    );

}


export default OrganizationCard;