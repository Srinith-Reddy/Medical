const urgentSamples = [
    {
        patient: "Amit Kumar",
        test: "Troponin Test"
    },
    {
        patient: "Priya Sharma",
        test: "COVID RT-PCR"
    },
    {
        patient: "Rahul Verma",
        test: "Blood Culture"
    }
];

function UrgentSamples() {
    return (
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold mb-6">
                🚨 Urgent Samples
            </h2>

            <div className="space-y-4">

                {urgentSamples.map((sample, index) => (

                    <div
                        key={index}
                        className="border-l-4 border-red-500 bg-red-50 p-4 rounded-xl"
                    >

                        <h3 className="font-semibold">
                            {sample.patient}
                        </h3>

                        <p className="text-gray-600">
                            {sample.test}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default UrgentSamples;