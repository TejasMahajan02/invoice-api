import { IGenericInterface } from "src/Shared/generic.interface";
import { IProductRequest } from "../Requests/product.request";

export interface IProduct extends IGenericInterface, IProductRequest{}