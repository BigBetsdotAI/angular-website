import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParallaxDirective } from '../../directives/parallax';
import { FadeInDirective } from '../../directives/fade-in';

@Component({
  selector: 'app-hero',
  imports: [ParallaxDirective, FadeInDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  constructor(private router: Router) {}

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

}
