import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  services: Service[] = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      features: ['Responsive Design', 'Progressive Web Apps', 'E-commerce Solutions', 'CMS Development']
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that engage and delight',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      features: ['Native Apps', 'Cross-Platform', 'App Maintenance', 'App Store Optimization']
    },
    {
      icon: '🚀',
      title: 'Digital Marketing',
      description: 'Strategic digital marketing to grow your online presence',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'Email Campaigns']
    },
    {
      icon: '🎯',
      title: 'Brand Strategy',
      description: 'Comprehensive branding solutions to establish your unique identity',
      features: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Marketing Collateral']
    },
    {
      icon: '⚡',
      title: 'Performance Optimization',
      description: 'Speed and performance optimization for better user experience',
      features: ['Speed Optimization', 'SEO Audits', 'Analytics Setup', 'Conversion Optimization']
    }
  ];
}
