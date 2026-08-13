function Navbar({ patient }) {

    return (

        <header className="h-20 bg-white shadow-sm flex items-center justify-end px-8">

            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">

                {patient?.name
                    ? patient.name.charAt(0).toUpperCase()
                    : "P"}

            </div>

        </header>

    );

}

export default Navbar;