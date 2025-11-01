import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./features/about/about').then(m => m.About)
  },
  { 
    path: 'services', 
    loadComponent: () => import('./features/services/services').then(m => m.Services)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact)
  },
  { 
    path: 'portfolio', 
    loadComponent: () => import('./features/portfolio/portfolio-khushboo').then(m => m.PortfolioKhushboo)
  },
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./features/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
  },
  { 
    path: 'terms-of-service', 
    loadComponent: () => import('./features/terms-of-service/terms-of-service').then(m => m.TermsOfService)
  },
  { path: '**', redirectTo: '' }
];
