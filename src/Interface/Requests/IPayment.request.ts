export interface IPaymentRequest {
    customerId : string;
    customerName : string;
    paymentDate : Date;
    amount : number;
    // amountInBank : number;
    // bankCharges : number;
    refNumber : string;
    // description : string;
    // document : string;
}