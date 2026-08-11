import { FileText, ShieldCheck, Calendar, User, Stethoscope } from "lucide-react";

function RecordPreview() {

    const record = {
        patient: "Srinith",
        doctor: "Dr. John",
        recordType: "MRI Scan",
        uploaded: "10 Aug 2026",
        fileName: "MRI_Report.pdf",
        hash: "0x93af71bcde43f9b1287ab91cd349a12",
        status: "Verified"
    };

    return (

        <div className="space-y-8">

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

                <div className="flex items-center gap-4">

                    <FileText
                        size={45}
                        className="text-blue-600"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">

                            {record.fileName}

                        </h1>

                        <p className="text-gray-500">

                            Medical Record

                        </p>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

                <div className="grid grid-cols-2 gap-8">

                    <div>

                        <div className="flex items-center gap-3">

                            <User size={20} />

                            <span className="font-semibold">
                                Patient
                            </span>

                        </div>

                        <p className="mt-2 text-gray-600">

                            {record.patient}

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-3">

                            <Stethoscope size={20} />

                            <span className="font-semibold">
                                Doctor
                            </span>

                        </div>

                        <p className="mt-2 text-gray-600">

                            {record.doctor}

                        </p>

                    </div>

                    <div>

                        <div className="flex items-center gap-3">

                            <Calendar size={20} />

                            <span className="font-semibold">
                                Uploaded
                            </span>

                        </div>

                        <p className="mt-2 text-gray-600">

                            {record.uploaded}

                        </p>

                    </div>

                    <div>

                        <span className="font-semibold">

                            Record Type

                        </span>

                        <p className="mt-2 text-gray-600">

                            {record.recordType}

                        </p>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Blockchain Verification

                </h2>

                <div className="space-y-6">

                    <div>

                        <p className="text-gray-500">

                            SHA-256 Hash

                        </p>

                        <div className="bg-slate-100 rounded-xl p-4 mt-2 break-all">

                            {record.hash}

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <ShieldCheck
                            className="text-green-600"
                            size={30}
                        />

                        <span className="text-green-600 font-bold text-lg">

                            {record.status}

                        </span>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

                <h2 className="text-2xl font-bold mb-6">

                    PDF Preview

                </h2>

                <div className="h-[600px] border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">

                    <p className="text-gray-500">

                        PDF Preview will appear here after backend integration.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default RecordPreview;