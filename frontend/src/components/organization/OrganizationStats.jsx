function OrganizationStats({ organizations }) {

  const total = organizations.length;

  const hospitals = organizations.filter(
    org => org.type === "Hospital"
  ).length;

  const clinics = organizations.filter(
    org => org.type === "Clinic"
  ).length;

  const labs = organizations.filter(
    org => org.type === "Laboratory"
  ).length;

  const cards = [
    {
      title: "Total Organizations",
      value: total,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Hospitals",
      value: hospitals,
      color: "bg-sky-100 text-sky-600",
    },
    {
      title: "Clinics",
      value: clinics,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Laboratories",
      value: labs,
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (

    <div className="grid grid-cols-4 gap-6 mt-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-[28px] shadow-sm p-6 border border-gray-200"
        >

          <div
            className={`w-12 h-12 rounded-2xl ${card.color}`}
          ></div>

          <p className="mt-5 text-gray-500">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );
}

export default OrganizationStats;