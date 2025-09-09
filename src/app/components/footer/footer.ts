import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  navigateToCreators() {
    // Check if we're currently on a different page
    if (this.router.url !== '/') {
      // Navigate to home page first, then scroll to creators section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection('creators');
        }, 100);
      });
    } else {
      // Already on home page, just scroll to creators section
      this.scrollToSection('creators');
    }
  }

  navigateToTestimonials() {
    // Check if we're currently on a different page
    if (this.router.url !== '/') {
      // Navigate to home page first, then scroll to testimonials section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection('testimonials');
        }, 100);
      });
    } else {
      // Already on home page, just scroll to testimonials section
      this.scrollToSection('testimonials');
    }
  }

  navigateToContact() {
    // Navigate to contact page
    this.router.navigate(['/contact']);
  }

  private scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }
  }

}
