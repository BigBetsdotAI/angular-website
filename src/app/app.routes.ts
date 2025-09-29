import { Routes } from '@angular/router';
import { Contact } from './components/contact/contact';
import { Home } from './components/home/home';
import { Portfolio } from './portfolio/portfolio';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: AuthComponent },
  { path: 'login', redirectTo: 'auth' },
  { path: 'register', redirectTo: 'auth' },
  { path: 'contact', component: Contact },
  { path: 'portfolio', component: Portfolio },
  { path: '**', redirectTo: '' }
];
