import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss'
})
export class Testimonials {

  constructor(private router: Router) {}

  openPortfolio() {
    console.log('Testimonials Read More button clicked!');
    this.router.navigate(['/portfolio']);
  }

}
