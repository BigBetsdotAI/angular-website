import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeIn]'
})
export class FadeInDirective implements OnInit {
  @Input() delay: string = '0s';
  @Input() duration: string = '1s';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'transition', `opacity ${this.duration} ease-out, transform ${this.duration} ease-out`);
          this.renderer.setStyle(this.el.nativeElement, 'transition-delay', this.delay);
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
          this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.2 });

    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(40px)');

    observer.observe(this.el.nativeElement);
  }
}
