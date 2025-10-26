import { Directive, ElementRef, HostListener, Input, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  /**
   * ratio controls how strong the parallax is. 0 => no movement, 1 => moves same as distance
   * Use small values like 0.1 - 0.4 for subtle parallax.
   */
  @Input() ratio = 0.2;
  /**
   * Maximum translation in px to avoid extreme movement on large pages
   */
  @Input() maxTranslate = 150;

  private ticking = false;
  private boundOnScroll = this.onScroll.bind(this);

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // initial position
    this.update();
    window.addEventListener('scroll', this.boundOnScroll, { passive: true });
    window.addEventListener('resize', this.boundOnScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.boundOnScroll);
    window.removeEventListener('resize', this.boundOnScroll);
  }

  private onScroll(): void {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
    }
  }

  private update(): void {
    const el = this.el.nativeElement as HTMLElement;
    // If the element has a CSS animation or a transition that affects transform,
    // skip applying inline transform to avoid clobbering existing animations (e.g. carousel keyframes).
    const computed = window.getComputedStyle(el);
    const animationName = computed.animationName || '';
    const transition = computed.transition || '';
    if (animationName !== 'none' && animationName.trim() !== '') {
      return; // let CSS animation control transform
    }
    if (transition.includes('transform')) {
      return; // transition on transform present; avoid overwriting
    }
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // compute distance of element center from viewport center
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter; // positive below center

    // translate opposite to the scroll movement for a parallax effect
    let translate = -distanceFromCenter * this.ratio;

    // clamp to maxTranslate
    const max = Math.abs(this.maxTranslate);
    if (translate > max) translate = max;
    if (translate < -max) translate = -max;

    // apply transform
    el.style.transform = `translateY(${translate}px)`;
    el.style.willChange = 'transform';
  }
}
