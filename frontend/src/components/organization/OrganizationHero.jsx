function OrganizationHero({ organization }) {
  return (
    <div className="bg-gradient-to-r from-[#4F8EF7] via-[#5B7FFF] to-[#6C63FF] rounded-[32px] p-10 text-white shadow-xl">

      <p className="uppercase tracking-[0.3em] text-blue-100 text-xs font-medium">
        ORGANIZATION DASHBOARD
      </p>

      <h1 className="text-5xl font-bold mt-3">
        {organization?.name || "Organization"}
      </h1>

      <p className="mt-3 text-blue-100 text-xl">
        {organization?.type || "--"}
      </p>

      <div className="mt-10 grid grid-cols-3 gap-8">

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

          <p className="text-blue-100 text-sm uppercase tracking-wide">
            Registration No
          </p>

          <p className="text-xl font-semibold mt-2">
            {organization?.registration_no || "--"}
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

          <p className="text-blue-100 text-sm uppercase tracking-wide">
            Phone
          </p>

          <p className="text-xl font-semibold mt-2">
            {organization?.phone || "--"}
          </p>

        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

          <p className="text-blue-100 text-sm uppercase tracking-wide">
            Address
          </p>

          <p className="text-xl font-semibold mt-2">
            {organization?.address || "--"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default OrganizationHero;