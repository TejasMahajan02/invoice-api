export interface IBalanceSheetRequest {
    date : Date;
    IsInvoice : boolean;
    IsPayment : boolean;
    debitAmount : number;
    creditAmount : number;
    customerId : string;
}