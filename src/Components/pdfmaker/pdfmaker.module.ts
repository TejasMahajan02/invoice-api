import { Module } from '@nestjs/common';
import { PdfmakerService } from './pdfmaker.service';

@Module({
  imports: [],
  providers: [PdfmakerService],
  controllers: [],
  exports: [PdfmakerService],
})
export class PdfmakerModule { }
