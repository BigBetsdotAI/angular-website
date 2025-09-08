import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input() ratio: number = 0.5;

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.scrollY;
    this.el.nativeElement.style.transform = `translateY(${scrolled * this.ratio}px)`;
  }
}
