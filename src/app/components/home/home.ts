import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Brands } from '../brands/brands';
import { Clients } from '../clients/clients';
import { Footer } from '../footer/footer';
import { Services } from '../services/services';
import { Testimonials } from '../testimonials/testimonials';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    Brands,
    About,
    Services,
    Testimonials,
    Clients,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
