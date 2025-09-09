import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {

  constructor(private router: Router) {}

  openPortfolio() {
    console.log('Read More button clicked!');
    console.log('Navigating to portfolio page...');
    // Navigate to portfolio page in the same tab
    this.router.navigate(['/portfolio']);
  }

}
