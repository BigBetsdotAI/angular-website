import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-brand',
  standalone: true,
  templateUrl: './ourBrand.html',
  styleUrl: './ourBrand.scss'
})
export class OurBrand {

  constructor(private router: Router) {}

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
