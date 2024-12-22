export interface IInvoiceRequest {
    customerId: string;
    invoiceDate: Date;
    itemDetails: IItemDetail[];
}

export interface IItemDetail {
    productId: string;
    quantity: number;
}

export interface BillingToDetail {
    name: string;
    address: string;
    city: string;
    pinCode: string;
    state: string;
}