import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  authForm: FormGroup;
  sparkles: Array<{left: number, top: number, size: number, delay: number}> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      fullName: [''],
      agreeToTerms: [false]
    });

    // Initialize sparkles
    this.initializeSparkles();
  }

  ngOnInit() {
    // Check if we should default to signup mode
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'signup') {
        this.isLogin = false;
        this.toggleAuthMode();
      }
    });
  }

  private initializeSparkles() {
    for (let i = 0; i < 16; i++) {
      this.sparkles.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 10 + 4, // 4px to 14px
        delay: Math.random() * 3 // 0 to 3 seconds
      });
    }
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    if (this.isLogin) {
      this.authForm.removeControl('confirmPassword');
      this.authForm.removeControl('fullName');
      this.authForm.removeControl('agreeToTerms');
    } else {
      this.authForm.addControl('confirmPassword', this.fb.control('', [Validators.required]));
      this.authForm.addControl('fullName', this.fb.control('', [Validators.required]));
      this.authForm.addControl('agreeToTerms', this.fb.control(false, [Validators.requiredTrue]));
    }
  }

  onSubmit() {
    if (this.authForm.valid) {
      console.log('Form submitted:', this.authForm.value);
      // Implement authentication logic here
    }
  }

  socialLogin(provider: string) {
    console.log(`${provider} login clicked`);
    // Implement social media authentication
  }
}