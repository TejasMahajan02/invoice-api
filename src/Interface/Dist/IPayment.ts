import { IGenericInterface } from "src/Shared/generic.interface";
import { IPaymentRequest } from "../Requests/IPayment.request";

export interface IPayment extends IGenericInterface, IPaymentRequest{}