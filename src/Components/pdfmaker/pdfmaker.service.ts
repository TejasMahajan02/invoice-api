import { Injectable } from '@nestjs/common';
import * as PdfPrinter from 'pdfmake';
import * as getStream from 'get-stream';
import { Response } from "express";
import { fonts } from 'src/Shared/constants/variables.constant';

@Injectable()
export class PdfmakerService {
    private readonly printer = new PdfPrinter(fonts);

    async generateAndDownloadPdf(res: Response, docDefinition: any, filename: string = 'invoice.pdf') {
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
        pdfDoc.end();

        const pdfBuffer = await getStream.buffer(pdfDoc); // Waits until the stream ends and returns the entire buffer

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=${filename}`,  // Use 'attachment' to force download
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);
    }
}
