import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-christmas-decorations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './christmas-decorations.html',
  styleUrls: ['./christmas-decorations.scss']
})
export class ChristmasDecorationsComponent implements OnInit {
  showSantaCard = false;

  ngOnInit() {
    // Show Santa card after a delay
    setTimeout(() => {
      this.showSantaCard = true;
    }, 2000);
  }

  closeSantaCard() {
    this.showSantaCard = false;
  }
}
