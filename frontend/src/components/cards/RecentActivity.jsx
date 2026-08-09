function RecentActivity() {
  const activities = [
    {
      title: "Prescription Added",
      description: "Dr. Rahul prescribed Paracetamol",
      time: "Today",
    },
    {
      title: "Blood Report Uploaded",
      description: "CBC Report uploaded by Apollo Hospital",
      time: "Yesterday",
    },
    {
      title: "Consultation Completed",
      description: "General Physician Consultation",
      time: "2 Aug 2026",
    },
  ];

  return (
    <div className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-8 mt-8">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

            <div>

              <h3 className="font-semibold text-gray-900">
                {activity.title}
              </h3>

              <p className="text-gray-500 mt-1">
                {activity.description}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                {activity.time}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentActivity;