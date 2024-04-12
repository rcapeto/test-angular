import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
  standalone: true
})
export class SkeletonDirective {
  private styleClass = 'skeleton'

  constructor(private el: ElementRef<HTMLElement>) {
    this.changeStyle()
  }

  changeStyle() {
    this.el.nativeElement.classList.add(this.styleClass)
  }
}
