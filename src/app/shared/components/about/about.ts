import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit {
  imagesLoading = true;
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/about.jpg'
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
        if (loadedCount === totalImages) {
          setTimeout(() => {
            this.imagesLoading = false;
          }, 800);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            this.imagesLoading = false;
          }, 800);
        }
      };
      
      img.src = url;
    });
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
