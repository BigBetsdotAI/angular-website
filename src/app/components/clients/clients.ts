import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {
  isPortfolioModalOpen = false;

  openKhushbooPortfolio() {
    this.isPortfolioModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closePortfolioModal() {
    this.isPortfolioModalOpen = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
