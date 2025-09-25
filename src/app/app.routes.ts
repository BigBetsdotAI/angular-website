import { Routes } from '@angular/router';
import { Contact } from './features/contact/contact';
import { Home } from './features/home/home';
import { Portfolio } from './features/portfolio/portfolio';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'portfolio', component: Portfolio },
  { path: '**', redirectTo: '' }
];
