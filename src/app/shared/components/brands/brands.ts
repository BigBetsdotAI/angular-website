import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands implements OnInit {
  imagesLoading = true;
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand1.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand2.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand3.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand5.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand6.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/brand4.jpg'
  ];

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
}
