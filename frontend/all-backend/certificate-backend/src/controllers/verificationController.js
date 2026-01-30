import Certificate from '../models/Certificate.js';

export const verifyCertificate = async (req, res) => {
    const { id } = req.params;

    try {
        const certificate = await Certificate.findOne({ certificateId: id });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        res.json({
            valid: true,
            studentName: certificate["Student Name"],
            internshipDomain: certificate.Domain,
            period: certificate.issueDate ? `Issued: ${certificate.issueDate}` : 'N/A',
            downloadUrl: certificate.certificateUrl || null,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
