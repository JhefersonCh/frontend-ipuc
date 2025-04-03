import { Component, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  url: InputSignal<string> = input<string>('');
}
