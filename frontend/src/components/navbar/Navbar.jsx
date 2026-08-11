function Navbar({ patient }) {

    return (

        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Patient Dashboard
                </h1>

                <p className="text-gray-500">
                    Welcome back, {patient?.name || "Patient"} 👋
                </p>

            </div>

            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">

                {patient?.name
                    ? patient.name.charAt(0).toUpperCase()
                    : "P"}

            </div>

        </header>

    );

}

export default Navbar;