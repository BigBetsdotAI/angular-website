import { Routes } from '@angular/router';
import { Contact } from './features/contact/contact';
import { Home } from './features/home/home';
// import { Portfolio } from './features/portfolio/portfolio';
import { PortfolioKhushboo } from './features/portfolio/portfolio-khushboo';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  // { path: 'portfolio', component: Portfolio },
  { path: 'portfolio', component: PortfolioKhushboo },
  { path: '**', redirectTo: '' }
];
