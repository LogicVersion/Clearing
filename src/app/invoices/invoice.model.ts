export class Invoice {
  ID: number = 0;
  bDate: Date = new Date();
  consultDate: Date = new Date();
  billNO: string = '***';
  JobCode: string = '';
  billType: string = '--Select--';
  pNo: string = '';
  clientID: string = '';
  AmountBilled: number = 0;
  profFee: number = 0;
  AmtBF: number = 0;
  AmountBilledInWord: string = '';
  AmountPaid: number = 0;
  Balance?: number = 0;
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
  JobNature: string = '--Select--';
  Address: string = '';
  Voy: string = '';
  //invoiceDetails: InvoiceDetails[] = [];
}

export class InvoiceDetails {
  billNO: string = '';
  SNO: number = 0;
  dtDate: Date = new Date();
  drgName: string = '';
  Price: number = 0;
  Qty: number = 0;
  subTotal: number = 0;
  VAT: number = 0;
  Interest: number = 0;
  Total: number = 0;
  billType: string = '';
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

export class InvoiceList {
  billNO: string = '';
  ID: number = 0;
  bDate: Date = new Date();
  dtDate: Date = new Date();
  drgName: string = '';
  Price: number = 0;
  Qty: number = 0;
  subTotal: number = 0;
  AmountBilledInWord: string = '';
  ConsigneeCode: string = '';
  IssuedBy: string = '';
  GoodsDescription: string = '';
  CoyFullName: string = '';
  CoyAddress: string = '';
  JobCode: string = '';
  CustName: string = '';
  Interest: number = 0;
  Total: number = 0;
  billType: string = '';
  BLNo: string = '';
  vTotal: number = 0;
  gTotal: number = 0;
  TINo: string = '';
  ExchRateMax: string = '';
  ExchRate: string = '';
  Serial: number = 0;
  CheckedBy: string = '';
  Carrier: string = '';
  AmountPaid: number = 0;
  SubTotal2: number = 0;
  Balance: number = 0;
  VAT: number = 0;
  BillCategory: string = '';
  BillStatus: string = '';
  InvTotal: number = 0;
  FreightCat: string = '';
  Curr: string = '';
  AmountBilled: number = 0;
  AmountPayable: number = 0;
  JobStartDate: Date = new Date();
  JobEndDate: Date = new Date();
  NoOf20Ft: number = 0;
  NoOf40Ft: number = 0;
  Content: string = '';
  JobNature: string = '';
  Mth: string = '';
  Yr: string = '';
  SerialCode: string = '';
  Voy: string = '';
  SNO: number = 0;
  PK_SNo: number = 0;
}

export class InvoiceDetailsList {
  PK_SNo: number = 0;
  billNO: string = '';
  dtDate: Date = new Date();
  drgName: string = '';
  Price: number = 0;
  Qty: number = 0;
  subTotal: number = 0;
  Interest: number = 0;
  Total: number = 0;
  Serial: number = 0;
  VAT: number = 0;
  BillCategory: string = '';
  BillStatus: string = '';
  FreightCat: string = '';
}


export class BillingExpense {
  JobCode: string = '';
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
  BillStatus: string = '';
  BillCategory: string = '';
  BillNo: string = '';
}

export class Report {
  coyID: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  billNO: string = '';
  isLess: boolean = false; //less details for Auditors
}
