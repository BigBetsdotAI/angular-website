import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]',
  standalone: true
})
export class FadeInDirective implements OnInit {
  @Input() delay: string = '0s';
  @Input() duration: string = '1s';

  /**
   * direction: 'up' (default) | 'left' | 'right'
   * - 'up' => translateY(40px) -> translateY(0)
   * - 'left' => translateX(-40px) -> translateX(0)
   * - 'right' => translateX(40px) -> translateX(0)
   */
  @Input() direction: 'up' | 'left' | 'right' = 'up';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'transition', `opacity ${this.duration} ease-out, transform ${this.duration} ease-out`);
          this.renderer.setStyle(this.el.nativeElement, 'transition-delay', this.delay);
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          // reset transform to 0 depending on direction
          const resetTransform = this.direction === 'left' || this.direction === 'right'
            ? 'translateX(0)'
            : 'translateY(0)';
          this.renderer.setStyle(this.el.nativeElement, 'transform', resetTransform);
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.2 });

    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    // set initial transform based on requested direction
    const initialTransform = this.direction === 'left'
      ? 'translateX(-40px)'
      : this.direction === 'right'
        ? 'translateX(40px)'
        : 'translateY(40px)';
    this.renderer.setStyle(this.el.nativeElement, 'transform', initialTransform);

    observer.observe(this.el.nativeElement);
  }
}
