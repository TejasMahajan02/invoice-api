import { IGenericInterface } from "src/Shared/generic.interface";
import { ICustomerRequest } from "../Requests/ICustomerRequest.request";

export interface ICustomer extends IGenericInterface, ICustomerRequest{}