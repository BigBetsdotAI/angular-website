import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Hero } from '../../shared/components/hero/hero';
import { About } from '../../shared/components/about/about';
import { Brands } from '../../shared/components/brands/brands';
import { Clients } from '../../shared/components/clients/clients';
import { Footer } from '../../layout/footer/footer';
import { Services } from '../../shared/components/services/services';
import { Testimonials } from '../../shared/components/testimonials/testimonials';

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
