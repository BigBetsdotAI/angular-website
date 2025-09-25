import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-services',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit {
  imagesLoading = true;
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/podcast.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/contentcreation.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/digitalmarketing.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/leadgen.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/blogs.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/socialgrow.png'
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
