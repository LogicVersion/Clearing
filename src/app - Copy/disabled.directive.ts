import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[isDisabled]',
})
export class DisabledDirective {
  @Input()
  set isDisabled(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    setTimeout(() => this.ngControl.control![action]());
  }

  constructor(private ngControl: NgControl) {}
}
