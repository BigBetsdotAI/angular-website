import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-test',
  template: `
    <div>
      <h1>Contact Page Test</h1>
      <p>If you can see this, the contact route is working!</p>
    </div>
  `,
  styles: [`
    div {
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #333;
    }
  `]
})
export class ContactTest {
}
