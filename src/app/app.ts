import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Brands } from './components/brands/brands';
import { Clients } from './components/clients/clients';
import { Footer } from './components/footer/footer';
import { Services } from './components/services/services';
import { Testimonials } from './components/testimonials/testimonials';
import { FadeInDirective } from './directives/fade-in';
import { ParallaxDirective } from './directives/parallax';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    Hero,
    Brands,
    About,
    Services,
    Testimonials,
    Clients,
    Footer,
    ParallaxDirective,
    FadeInDirective
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
