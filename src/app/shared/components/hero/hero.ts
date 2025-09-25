import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
// import { ParallaxDirective } from '../directives/parallax';
// import { FadeInDirective } from '../directives/fade-in';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit {
  imagesLoading = true;
  loadedImages = new Set<string>();
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/agency.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/growth.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/growbusiness.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/socialmedia.png'
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.preloadImages();
  }

  preloadImages() {
    let loadedCount = 0;
    const totalImages = this.imageUrls.length;

    this.imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        this.loadedImages.add(url);
        
        if (loadedCount === totalImages) {
          // Add a small delay to show the loader effect
          setTimeout(() => {
            this.imagesLoading = false;
          }, 500);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        // Still count as loaded to prevent infinite loading
        if (loadedCount === totalImages) {
          setTimeout(() => {
            this.imagesLoading = false;
          }, 500);
        }
      };
      
      img.src = url;
    });
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

}
