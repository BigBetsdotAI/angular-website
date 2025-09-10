import { Component, OnInit } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

@Component({
  selector: 'app-portfolio',
  imports: [Footer,Header],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio implements OnInit {

  ngOnInit() {
    // Scroll to top when portfolio component is initialized
    window.scrollTo(0, 0);
  }

}
