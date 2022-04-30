
export class Customer {
    SNo: number=0;
    ConsigneeCode!: string;
    ConsigneeName!: string;
    GroupName!: string;
    ConsigneeAddress?:  string;
  }

  export class CustomerGroup {
    ID: number = 0;
    GroupName!: string;
  }
