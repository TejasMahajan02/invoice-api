import { IGenericInterface } from "src/Shared/generic.interface";
import { IInvoiceRequest } from "../Requests/invoice.request";

export interface IInvoice extends IGenericInterface, IInvoiceRequest{}