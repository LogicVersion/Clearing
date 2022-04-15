export class Invoice {
  ID: number = 0;
  bDate: Date = new Date();
  consultDate: Date = new Date();
  billNO: string = '***';
  JobCode: string = '';
  billType: string = '';
  pNo: string = '';
  clientID: string = '';
  AmountBilled: number = 0;
  profFee: number = 0;
  AmtBF: number = 0;
  AmountBilledInWord: string = '';
  AmountPaid: number = 0;
  BillingMonth: string = '';
  BillingYear: number = 0;
  diagnosis: string = '';
  isPaid: boolean = false;
  ConsigneeCode: string = '';
  IssuedBy: string = '';
  GoodsDescription: string = '';
  CoyFullName: string = '';
  CoyAddress: string = '';
  BLNo: string = '';
  CheckedBy: string = '';
  Carrier: string = '';
  PORder: string = '';
  JPCNo: string = '';
  Weight: string = '';
  Curr: string = '';
  JobStartDate: Date = new Date();
  JobEndDate: Date = new Date();
  NoOf20Ft: number = 0;
  NoOf40Ft: number = 0;
  Content: string = '';
  JobNature: string = '';
  Address: string = '';
  Voy: string = '';
  invoiceDetails: InvoiceDetails[]=[];
}

export class InvoiceDetails {
  billNO: string = '';
  SNO: number = 0;
  dtDate: Date = new Date();
  drgName: string = '';
  Price: number = 0;
  Qty: number = 0;
  subTotal: number = 0;
  Interest: number = 0;
  Total: number = 0;
  billType: string = '';
  VAT: number = 0;
  ExchRate: number = 0;
  Serial: number = 0;
  VatScope: string = '';
  AmountPaid: number = 0;
  BillCategory: string = '';
  BillStatus: string = '';
  FreightCat: string = '';
  FrightCat: string = '';
  PK_SNo: number = 0;
}

