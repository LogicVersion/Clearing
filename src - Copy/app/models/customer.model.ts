
export class Customer {
    SNo: null|number=null;
    ConsigneeCode!: string;
    ConsigneeName!: string;
    GroupName!: string;
    ConsigneeAddress?:  string;
  }

  export class CustomerGroup {
    ID: null | number = null;
    GroupName!: string;
  }
