import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-clients',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients implements OnInit {
  imagesLoading = true;
  
  imageUrls = [
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/khushbooclient.jpeg',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/RahulClient.png',
    'https://angular-webpage.s3.eu-north-1.amazonaws.com/assets/images/RheaClient.png'
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
          }, 1200);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setTimeout(() => {
            this.imagesLoading = false;
          }, 1200);
        }
      };
      
      img.src = url;
    });
  }

  openPortfolio() {
    console.log('Read More button clicked!');
    console.log('Navigating to portfolio page...');
    // Navigate to portfolio page in the same tab and scroll to top
    this.router.navigate(['/portfolio']).then(() => {
      window.scrollTo(0, 0);
    });
  }

}
