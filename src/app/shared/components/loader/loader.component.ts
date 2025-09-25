import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader"></div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent { }