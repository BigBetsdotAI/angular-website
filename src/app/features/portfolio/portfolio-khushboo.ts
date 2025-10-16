import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portfolio-khushboo',
  imports: [CommonModule],
  templateUrl: './portfolio-khushboo.html',
  styleUrl: './portfolio-khushboo.scss'
})
export class PortfolioKhushboo implements OnInit {
  
  activeTab: string = 'Acting Stills';
  currentSlide: number = 0;
  scrollY: number = 0;
  
  testimonials = [
    { quote: "Khushboo brings incredible energy and professionalism to every project.", author: "Director Name", role: "Film Director" },
    { quote: "Working with Khushboo was an absolute pleasure. Her dedication is unmatched.", author: "Producer Name", role: "Executive Producer" },
    { quote: "A talented actress who truly understands the craft of storytelling.", author: "Co-Star Name", role: "Lead Actor" }
  ];

  campaigns = {
    'Acting Stills': [
      { title: 'Campaign 1', description: 'Campaign | Lorem sitis +status embett rarco' },
      { title: 'Campaign 2', quote: 'Khushboo Kamal is fantastic to work with!', brand: 'Brand Name' }
    ],
    'Photoshoots': [
      { title: 'Fashion Shoot 1', description: 'High fashion editorial campaign' },
      { title: 'Fashion Shoot 2', quote: 'Professional and creative!', brand: 'Fashion Brand' }
    ],
    'Behind-the-Scenes': [
      { title: 'BTS Shoot 1', description: 'Behind the scenes moments' },
      { title: 'BTS Shoot 2', quote: 'Great experience on set!', brand: 'Production House' }
    ],
    'Brand': [
      { title: 'Brand Campaign 1', description: 'Commercial brand collaboration' },
      { title: 'Brand Campaign 2', quote: 'Amazing brand ambassador!', brand: 'Corporate Brand' }
    ]
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Scroll to top when portfolio component is initialized
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.initParallax();
      this.initScrollAnimations();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollY = window.scrollY;
      this.updateParallax();
      this.animateOnScroll();
    }
  }

  initParallax() {
    // Parallax initialization
  }

  updateParallax() {
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    if (heroSection) {
      heroSection.style.transform = `translateY(${this.scrollY * 0.5}px)`;
    }
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Observer for slide-in animations (About section) - bidirectional
    const slideObserverOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Remove visible class when scrolling out
          entry.target.classList.remove('visible');
        }
      });
    }, slideObserverOptions);

    const slideElements = document.querySelectorAll('.slide-in-from-left, .slide-in-from-right');
    slideElements.forEach(el => slideObserver.observe(el));
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.8) {
        el.classList.add('visible');
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getCurrentCampaigns() {
    return this.campaigns[this.activeTab as keyof typeof this.campaigns] || [];
  }
}
