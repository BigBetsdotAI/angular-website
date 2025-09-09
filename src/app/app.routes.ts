import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Portfolio } from './portfolio/portfolio';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'portfolio', component: Portfolio },
  { path: '**', redirectTo: '' }
];
