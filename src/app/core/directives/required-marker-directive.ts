import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[formControlName][required], [ngModel][required]'
})
export class RequiredMarkerDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    const label = this.el.nativeElement.closest('label');
    if (label) {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'text-error');
      this.renderer.addClass(span, 'ml-1');
      const text = this.renderer.createText('*');
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(label, span);
    }
  }
}
