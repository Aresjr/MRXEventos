import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[emptyToNull]'
})
export class EmptyToNullDirective {

  constructor(private control: NgControl) {}

  @HostListener('blur')
  onBlur() {
    if (this.control.control?.value === '') {
      this.control.control.setValue(null);
    }
  }
}
