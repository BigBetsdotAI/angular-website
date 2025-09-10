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
menuOpen = false;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}
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
    // Handle special cases for sections that don't exist
    let targetSection = sectionId;
    if (sectionId === 'company') {
      // Company section doesn't exist, redirect to about section instead
      targetSection = 'about';
    }

    // Check if we're currently on the home page
    if (this.router.url === '/') {
      // Already on home page, just scroll to section
      this.scrollToSection(targetSection);
    } else {
      // Navigate to home page first, then scroll to section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToSection(targetSection);
        }, 100);
      });
    }
  }

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      // Scroll to top after navigation
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }

  private scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(`Attempting to scroll to section: ${sectionId}`);
      const element = document.getElementById(sectionId);
      if (element) {
        console.log(`Found element with ID: ${sectionId}, scrolling...`);
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      } else {
        console.warn(`Element with ID '${sectionId}' not found on the page`);
      }
    }
  }
}
