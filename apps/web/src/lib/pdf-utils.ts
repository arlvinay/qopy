import { PDFDocument } from 'pdf-lib';

export async function getPdfPageCount(file: File): Promise<number> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        return pdfDoc.getPageCount();
    } catch (error) {
        console.error('Error counting PDF pages:', error);
        return 1; // Default to 1 on error
    }
}
