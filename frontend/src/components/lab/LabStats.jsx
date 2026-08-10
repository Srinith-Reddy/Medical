function LabStats() {

    const stats = [
        {
            title: "Samples Received",
            value: 58,
            icon: "🧪"
        },
        {
            title: "Reports Generated",
            value: 46,
            icon: "📄"
        },
        {
            title: "Pending Tests",
            value: 12,
            icon: "⏳"
        },
        {
            title: "Critical Results",
            value: 3,
            icon: "🚨"
        }
    ];

    return (

        <div className="grid grid-cols-4 gap-6 mt-8">

            {stats.map((stat) => (

                <div
                    key={stat.title}
                    className="bg-white rounded-[28px] shadow-sm border border-gray-200 p-6 hover:shadow-lg transition"
                >

                    <div className="text-4xl">
                        {stat.icon}
                    </div>

                    <h3 className="text-gray-500 mt-4">
                        {stat.title}
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {stat.value}
                    </p>

                </div>

            ))}

        </div>

    );
}

export default LabStats;