import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']   // ✅ Correct property
})
export class Testimonials implements OnInit {
  imagesLoading = true;
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/khushbootestimonial.png'
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
          }, 1000);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            this.imagesLoading = false;
          }, 1000);
        }
      };
      
      img.src = url;
    });
  }
}
