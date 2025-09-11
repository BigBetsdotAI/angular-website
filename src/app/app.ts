import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}

// app.component.ts
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   imports:[FormsModule]
// })
// export class AppComponent {
//   formData = { name: '', email: '', message: '' };

//   sendEmail(e: Event) {
//     e.preventDefault();
//     emailjs
//       .send(
//         'service_1dgiuxb',
//         'template_cm4pp9b',
//         this.formData,
//         'apbmLEz0Ir3KF0xi5'
//       )
//       .then(
//         (result: EmailJSResponseStatus) => {
//           console.log('SUCCESS!', result.status, result.text);
//           alert('Message Sent!');
//         },
//         (error) => {
//           console.log('FAILED...', error);
//           alert('Error sending message');
//         }
//       );
//   }
//   submitForm() {
//     fetch('https://script.google.com/macros/s/AKfycbz2thVnQd6blJLJvYdp8bkn5TWWaiCiQhj6oVr6Hb4BIBJFHeF2gwtdOjYCMr_JcYMW/exec', {
//       method: 'POST',
//       body: JSON.stringify(this.formData),
//       headers: { 'Content-Type': 'application/json' }
//     })
//     .then(res => res.text())
//     .then(res => alert('Saved successfully in Google Sheet!'))
//     .catch(err => console.error(err));
//   }
// }





