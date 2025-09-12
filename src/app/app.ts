
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppComponent {
  successMessage = '';
  errorMessage = '';

  // Your Google Apps Script Web App URL
  private scriptURL = 'https://script.google.com/macros/s/AKfycbz2thVnQd6blJLJvYdp8bkn5TWWaiCiQhj6oVr6Hb4BIBJFHeF2gwtdOjYCMr_JcYMW/exec';

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post(this.scriptURL, this.contactForm.value).subscribe({
        next: () => {
          this.successMessage = 'Form submitted successfully!';
          this.errorMessage = '';
          this.contactForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Something went wrong. Try again!';
          this.successMessage = '';
          console.error(err);
        }
      });
    }
  }
}












