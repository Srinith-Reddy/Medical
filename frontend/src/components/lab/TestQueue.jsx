const tests = [
    {
        patient: "Rahul Sharma",
        test: "Complete Blood Count",
        status: "Pending"
    },
    {
        patient: "Ananya Rao",
        test: "Liver Function Test",
        status: "In Progress"
    },
    {
        patient: "Vikram Singh",
        test: "Blood Sugar",
        status: "Completed"
    },
    {
        patient: "Sneha Patel",
        test: "Lipid Profile",
        status: "Pending"
    }
];

function TestQueue() {
    return (

        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-200">

            <h2 className="text-2xl font-bold mb-6">
                Today's Test Queue
            </h2>

            <div className="space-y-4">

                {tests.map((test, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center border-b pb-3"
                    >

                        <div>

                            <h3 className="font-semibold">
                                {test.patient}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {test.test}
                            </p>

                        </div>

                        <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                            {test.status}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default TestQueue;