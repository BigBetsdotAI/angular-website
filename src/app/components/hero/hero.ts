import { Component } from '@angular/core';
import { ParallaxDirective } from '../../directives/parallax';
import { FadeInDirective } from '../../directives/fade-in';

@Component({
  selector: 'app-hero',
  imports: [ParallaxDirective, FadeInDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

}
