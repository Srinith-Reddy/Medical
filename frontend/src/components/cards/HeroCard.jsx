function HeroCard({ patient }) {

  const getGreeting = () => {

    const hour = Number(
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      }).format(new Date())
    );

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 17) {
      return "Good afternoon";
    }

    return "Good evening";
  };

  return (
    <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-200 mb-8">

      {/* Header */}

      <div className="mb-8">

        <p className="text-sm text-gray-500 tracking-wide uppercase">
          Medical Blockchain
        </p>

        <h1 className="text-4xl font-bold text-gray-900 mt-2">
          {getGreeting()}, {patient?.name || "Patient"}
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Your medical records are securely stored, verified, and always accessible.
        </p>

      </div>

      {/* Health Summary */}

      <div className="grid grid-cols-3 gap-5">

        {/* Blood Group */}

        <div className="bg-slate-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">

          <p className="text-sm text-gray-500">
            Blood Group
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {patient?.blood_group || "--"}
          </h2>

        </div>

        {/* Height */}

        <div className="bg-slate-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">

          <p className="text-sm text-gray-500">
            Height
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {patient?.height || "--"} cm
          </h2>

        </div>

        {/* Weight */}

        <div className="bg-slate-50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">

          <p className="text-sm text-gray-500">
            Weight
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            {patient?.weight || "--"} kg
          </h2>

        </div>

      </div>

    </div>
  );
}

export default HeroCard;