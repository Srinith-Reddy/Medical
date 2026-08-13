function PrescriptionInfo({

    patients,
    organizations,
    doctors,
    consultations,

    patientId,
    organizationId,
    doctorId,
    consultationId,

    setPatientId,
    setOrganizationId,
    setDoctorId,
    setConsultationId

}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

            <h2 className="text-2xl font-semibold mb-8">

                Prescription Information

            </h2>

            <div className="grid grid-cols-2 gap-6">

                {/* Patient */}

                <div>

                    <label className="block text-sm font-medium mb-2">
                        Patient
                    </label>

                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >

                        <option value="">
                            Select Patient
                        </option>

                        {patients.map((patient) => (

                            <option
                                key={patient.id}
                                value={patient.id}
                            >

                                {patient.name}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Doctor */}

                <div>

                    <label className="block text-sm font-medium mb-2">
                        Doctor
                    </label>

                    <select
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >

                        <option value="">
                            Select Doctor
                        </option>

                        {doctors.map((doctor) => (

                            <option
                                key={doctor.id}
                                value={doctor.id}
                            >

                                {doctor.name}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Organization */}

                <div>

                    <label className="block text-sm font-medium mb-2">
                        Organization
                    </label>

                    <select
                        value={organizationId}
                        onChange={(e) => setOrganizationId(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >

                        <option value="">
                            Select Organization
                        </option>

                        {organizations.map((organization) => (

                            <option
                                key={organization.id}
                                value={organization.id}
                            >

                                {organization.name}

                            </option>

                        ))}

                    </select>

                </div>

                {/* Consultation */}

                <div>

                    <label className="block text-sm font-medium mb-2">
                        Consultation
                    </label>

                    <select
                        value={consultationId}
                        onChange={(e) => setConsultationId(e.target.value)}
                        className="w-full border rounded-xl p-3"
                    >

                        <option value="">
                            Select Consultation
                        </option>

                        {consultations.map((consultation) => (

                            <option
                                key={consultation.id}
                                value={consultation.id}
                            >

                                {consultation.id}

                            </option>

                        ))}

                    </select>

                </div>

            </div>

        </div>

    );

}

export default PrescriptionInfo;