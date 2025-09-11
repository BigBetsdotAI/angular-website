import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { isPlatformBrowser } from '@angular/common';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, Header, Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  isModalOpen = false;
  contactForm: FormGroup;
  quickContactForm: FormGroup;
  isSubmitting = false;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    // Initialize reactive forms with validation
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.quickContactForm = this.fb.group({
      quickName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      quickEmail: ['', [Validators.required, Validators.email]],
      quickPhone: ['', [Validators.pattern(/^[\d\s\+\-\(\)]+$/), Validators.minLength(10)]],
      quickMessage: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

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

  onSubmitQuickForm() {
    if (this.quickContactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const contactData = this.quickContactForm.value;
      
      this.contactService.sendContactForm(contactData).subscribe({
        next: (response) => {
          if (response.success) {
            alert('✅ ' + response.message);
            this.quickContactForm.reset();
            this.closeContactForm();
          } else {
            alert('❌ ' + response.message);
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Contact form error:', error);
          let errorMessage = 'Failed to send message. Please try again later.';
          
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          
          alert('❌ ' + errorMessage);
          this.isSubmitting = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.quickContactForm);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.contactForm.reset();
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.contactForm);
    }
  }

  // Helper method to check if a field has errors and is touched
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Get error message for a field
  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters long`;
      if (field.errors['pattern']) {
        if (fieldName.includes('Name')) return 'Name should contain only letters and spaces';
        if (fieldName.includes('Phone')) return 'Please enter a valid phone number';
      }
    }
    return '';
  }

  // Helper to get display name for field
  private getFieldDisplayName(fieldName: string): string {
    const names: {[key: string]: string} = {
      fullName: 'Full Name',
      quickName: 'Name',
      email: 'Email',
      quickEmail: 'Email',
      quickPhone: 'Phone Number',
      message: 'Message',
      quickMessage: 'Message'
    };
    return names[fieldName] || fieldName;
  }

  // Mark all fields in form group as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
