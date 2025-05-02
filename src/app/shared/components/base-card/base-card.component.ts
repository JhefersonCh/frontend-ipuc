import { MatMenuModule } from '@angular/material/menu';
import { Component, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-base-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.scss',
})
export class BaseCardComponent {
  title: InputSignal<string> = input<string>('');
  withActions: InputSignal<boolean> = input<boolean>(false);
  withMenu: InputSignal<boolean> = input<boolean>(false);
}
