from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os


class PDFService:

    @staticmethod
    def generate_prescription_pdf(
        prescription: dict,
        file_path: str
    ) -> str:

        folder = os.path.dirname(file_path)

        if folder:
            os.makedirs(folder, exist_ok=True)

        pdf = canvas.Canvas(
            file_path,
            pagesize=A4
        )

        width, height = A4
        y = height - 50

        data = prescription["prescription"]
        medicines = prescription["medicines"]

        # Title
        pdf.setFont("Helvetica-Bold", 18)
        pdf.drawString(50, y, "Medical Prescription")

        y -= 40

        # Prescription details
        pdf.setFont("Helvetica", 11)

        pdf.drawString(
            50, y,
            f"Prescription ID: {data['id']}"
        )
        y -= 20

        pdf.drawString(
            50, y,
            f"Patient ID: {data['patient_id']}"
        )
        y -= 20

        pdf.drawString(
            50, y,
            f"Staff ID: {data['staff_id']}"
        )
        y -= 20

        pdf.drawString(
            50, y,
            f"Consultation ID: {data['consultation_id']}"
        )
        y -= 30

        # Notes
        if data.get("notes"):
            pdf.setFont("Helvetica-Bold", 12)
            pdf.drawString(50, y, "Notes:")
            y -= 20

            pdf.setFont("Helvetica", 11)
            pdf.drawString(50, y, data["notes"])
            y -= 30

        # Medicines
        pdf.setFont("Helvetica-Bold", 13)
        pdf.drawString(50, y, "Medicines")
        y -= 25

        pdf.setFont("Helvetica", 11)

        for index, medicine in enumerate(medicines, start=1):

            pdf.drawString(
                50,
                y,
                f"{index}. Medicine ID: {medicine['medicine_id']}"
            )
            y -= 18

            pdf.drawString(
                70,
                y,
                f"Dosage: {medicine['dosage']}"
            )
            y -= 18

            pdf.drawString(
                70,
                y,
                f"Quantity: {medicine['quantity']}"
            )
            y -= 18

            pdf.drawString(
                70,
                y,
                f"Instructions: {medicine['instructions']}"
            )
            y -= 30

            if y < 80:
                pdf.showPage()
                y = height - 50
                pdf.setFont("Helvetica", 11)

        pdf.save()

        return file_path