import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  addButtVisible = true;
  saveButtVisible = false;
  cancelButtVisible = false;


  setButtons(bVal: boolean) {
    // no need
    this.addButtVisible = bVal;
    this.saveButtVisible = !bVal;
    this.cancelButtVisible = !bVal;

    // this.editButtVisible.Visible = bVal;
    // this.delButtVisible = bVal;
    //this.reLoadButtVisible = bVal;
  }
}
