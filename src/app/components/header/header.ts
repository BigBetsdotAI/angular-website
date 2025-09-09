import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
isVisited = false;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

markVisited(event: Event) {
  console.log('yesyes yeah');
  event.preventDefault();
  console.log('oh yeah');
  this.isVisited = true;
  console.log('oh nooo');
  this.navigateToContact();
  console.log('oh shit');
}

  navigateToSection(sectionId: string) {
    // Check if we're currently on the contact page
    if (this.router.url === '/contact') {
      // Navigate to home page first, then scroll to section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection(sectionId);
        }, 100);
      });
    } else {
      // Already on home page, just scroll to section
      this.scrollToSection(sectionId);
    }
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      // Scroll to top after navigation
      if (isPlatformBrowser(this.platformId)) {
      }
    });
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
