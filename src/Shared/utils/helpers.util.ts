import { Invoice } from "src/dataModels/Schemas/invoiceSchema";
import { ToWords } from "to-words";
const toWords = new ToWords();

export const formatDateToLocal = (invoiceDate: Date) => {
    invoiceDate = new Date(invoiceDate);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return invoiceDate.toLocaleDateString('en-US', options);
}

export const sum = (...numbers: number[]) => numbers.reduce((acc, num) => acc + num, 0);
export const makeItRupee = (num: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(num);
export const makeItWords = (num: number) => toWords.convert(num, { currency: true, ignoreDecimal: true });

export const calculateAmount = (quantity: number, unitCost: number) => quantity * unitCost;
export const calculateTaxAmount = (quantity: number, unitCost: number, gstPercentage: number) => (
    (quantity * unitCost * gstPercentage) / 100
);

export const calculateSubTotal = (quantity: number, unitCost: number, gstPercentage: number) => {
    return calculateAmount(quantity, unitCost) + calculateTaxAmount(quantity, unitCost, gstPercentage);
}

export const calculateGstTotal = (invoiceData: any) => {
    return sum(...invoiceData.itemDetails.map((item) => {
        return calculateTaxAmount(item.quantity, item.unitCost, item.gstPercentage);
    }));
}

export const calculateItemsTotal = (invoiceData: any) => {
    return sum(...invoiceData.itemDetails.map((item) => {
        return calculateAmount(item.quantity, item.unitCost);
    }));
}

export const calculateGrandTotal = (invoiceData: Invoice) => {
    return calculateGstTotal(invoiceData) + calculateItemsTotal(invoiceData)
}


export const generateInvoiceDocDefination = (invoiceData: any) => ({
    footer: function (currentPage: number, pageCount: number) { return { text: pageCount > 1 ? currentPage.toString() + ' of ' + pageCount : null, alignment: 'right', margin: [25, 0] } },
    content: [
        {
            columns: [
                {
                    image: './src/assets/logo.png',
                    width: 130,
                    height: 40,
                    alignment: 'left'
                },
                { text: 'Invoice', style: 'invoiceHeading', alignment: 'right' },
            ],
        },
        { text: "\n\n" },
        {
            columns: [
                {
                    width: '*',
                    lineHeight: 1.25,
                    stack: [
                        { text: 'Spundan Consultancy And IT Solutions Pvt. Ltd.', style: 'companyName' },
                        { text: 'M-12 Sai Ram Plaza, 63 Mangal Nagar Vishnu Puri Colony', style: 'bodyFont' },
                        { text: 'Indore - 452001, Madhya Pradesh, India', style: 'bodyFont' },
                        { text: 'Website: www.spundan.com', style: 'bodyFont' },
                        { text: 'Email: info@spundan.com', style: 'bodyFont' },
                        { text: 'CIN: U72200MP2011PTC025132 GSTIN: 23AAPCS2658Q1ZK', style: 'bodyFont' },
                    ],
                }
            ]
        },
        { text: "\n\n" },
        {
            columns: [
                {
                    width: '50%',
                    lineHeight: 1.25,
                    stack: [
                        { text: 'To:', bold: true },
                        { text: 'Sanjay Wadhwani', style: 'bodyFont' },
                        { text: '3rd Floor, Sigma Arcade, Varthur Main Road,', style: 'bodyFont' },
                        { text: 'Marathalli, Bengaluru', style: 'bodyFont' },
                        { text: 'Karnataka 560037', style: 'bodyFont' }
                    ],
                },
                {
                    width: '50%',
                    lineHeight: 1.25,
                    stack: [
                        { text: 'Billing Address:', bold: true },
                        { text: invoiceData.billingTo.name, style: 'bodyFont' },
                        { text: invoiceData.billingTo.address, style: 'bodyFont' },
                        { text: invoiceData.billingTo.city, style: 'bodyFont' },
                        { text: `${invoiceData.billingTo.state} ${invoiceData.billingTo.pinCode}`, style: 'bodyFont' }
                    ],
                    alignment: 'right'
                }
            ]
        },
        { text: "\n\n" },
        {
            table: {
                headerRows: 1,
                widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                body: [
                    [
                        { text: 'S.No', style: 'tableHeader' },
                        { text: 'Description', style: 'tableHeader' },
                        { text: 'Unit Price', style: 'tableHeader' },
                        { text: 'Quantity', style: 'tableHeader' },
                        { text: 'Net Amount', style: 'tableHeader' },
                        { text: 'Tax Rate', style: 'tableHeader' },
                        { text: 'Tax Type', style: 'tableHeader' },
                        { text: 'Tax Amount', style: 'tableHeader' },
                        { text: 'Total Amount', style: 'tableHeader' }
                    ],
                    ...invoiceData.itemDetails.map((item, index) => {
                        return [
                            index + 1,
                            item.itemDescription,
                            makeItRupee(item.unitCost),
                            item.quantity,
                            makeItRupee(calculateAmount(item.quantity, item.unitCost)),
                            `${item.gstPercentage}%`,
                            'GST',
                            makeItRupee(calculateTaxAmount(item.quantity, item.unitCost, item.gstPercentage)),
                            makeItRupee(calculateSubTotal(item.quantity, item.unitCost, item.gstPercentage))
                        ]
                    }),
                    [
                        { text: 'Total', colSpan: 7, alignment: 'right', bold: true }, {}, {}, {}, {}, {}, {},
                        makeItRupee(calculateGstTotal(invoiceData)),
                        makeItRupee(calculateItemsTotal(invoiceData))
                    ],
                    [
                        { text: 'Grand Total', colSpan: 8, alignment: 'right', bold: true }, {}, {}, {}, {}, {}, {}, {},
                        makeItRupee(calculateGrandTotal(invoiceData))
                    ]
                ]
            }
        },

        {
            text: `Amount in Words: ${makeItWords(calculateGrandTotal(invoiceData))}`, bold: true, margin: [0, 10, 0, 10]
        },

        { text: "\n\n" },
        { text: 'For Director,\n', style: 'bodyFont' },
        { text: 'SANJAY WADHWANI', bold: true, margin: [0, 5] },

        { text: "\n\n\n\n" },
        {
            text: [
                'Spundan Consultancy And IT Solutions Pvt. Ltd.\n',
                'M-12 Sai Ram Plaza, 63 Mangal Nagar Vishnu Puri Colony, Indore - 452001, Madhya Pradesh, India\n',
                'Website: www.spundan.com, Email: info@spundan.com'
            ],
            style: 'footer',
            lineHeight: 1.25,
        },
    ],

    styles: {
        companyName: {
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 12]
        },
        bodyFont: {
            fontSize: 12
        },
        invoiceHeading: {
            fontSize: 28,
            bold: true,
            color: 'black'
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
            fillColor: '#f2f2f2',
        },
        footer: {
            fontSize: 11,
            alignment: 'center',
            margin: [0, 50, 0, 0],
        }
    }
});