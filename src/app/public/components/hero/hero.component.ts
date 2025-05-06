import { Component, input, InputSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  heroUrl: InputSignal<string> = input<string>('');
  heroPublicId: InputSignal<string> = input<string>('');
  title: InputSignal<string> = input<string>('');
  name: InputSignal<string> = input<string>('');
  description: InputSignal<string> = input<string>('');
}
