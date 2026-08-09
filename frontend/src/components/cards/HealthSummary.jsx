function HealthSummary({ patient }) {
  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-gray-500 text-sm">
          Name
        </h3>

        <p className="text-2xl font-bold mt-2">
          {patient?.name || "--"}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-gray-500 text-sm">
          Blood Group
        </h3>

        <p className="text-2xl font-bold mt-2">
          {patient?.blood_group || "--"}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="text-gray-500 text-sm">
          Phone
        </h3>

        <p className="text-2xl font-bold mt-2">
          {patient?.phone || "--"}
        </p>
      </div>

    </div>
  );
}

export default HealthSummary;