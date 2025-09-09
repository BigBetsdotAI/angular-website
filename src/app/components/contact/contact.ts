import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule, Header, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  isModalOpen = false;
  
  formData = {
    fullName: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Scroll to top when component loads
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  openContactForm() {
    this.isModalOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeContactForm() {
    this.isModalOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  onSubmitQuickForm(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const contactData = {
      name: formData.get('quickName') as string,
      email: formData.get('quickEmail') as string,
      phone: formData.get('quickPhone') as string,
      subject: formData.get('quickSubject') as string,
      message: formData.get('quickMessage') as string
    };

    console.log('Quick contact form submitted:', contactData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form and close modal
    form.reset();
    this.closeContactForm();
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      // Here you can add your form submission logic
      // For example, send data to a backend service
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.fullName && 
             this.formData.email && 
             this.formData.subject && 
             this.formData.message);
  }

  private resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
