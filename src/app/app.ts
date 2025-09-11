// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports:[FormsModule]
})
export class AppComponent {
  formData = { name: '', email: '', message: '' };

  // sendEmail(e: Event) {
  //   e.preventDefault();
  //   emailjs
  //     .send(
  //       'service_vo424jh',
  //       'template_cm4pp9b',
  //       this.formData,
  //       'apbmLEz0Ir3KF0xi5'
  //     )
  //     .then(
  //       (result: EmailJSResponseStatus) => {
  //         console.log('SUCCESS!', result.status, result.text);
  //         alert('Message Sent!');
  //       },
  //       (error) => {
  //         console.log('FAILED...', error);
  //         alert('Error sending message');
  //       }
  //     );
  // }
  submitForm(formData: any) {
  fetch("https://script.google.com/macros/s/AKfycbz2thVnQd6blJLJvYdp8bkn5TWWaiCiQhj6oVr6Hb4BIBJFHeF2gwtdOjYCMr_JcYMW/exec", {
    method: "POST",
    mode: "no-cors", // ✅ bypass CORS
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  alert("Submitted! (Saved in Google Sheet, but no response shown)");
}
}







