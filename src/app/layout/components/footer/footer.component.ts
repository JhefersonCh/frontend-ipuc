import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  logo: InputSignal<string> = input<string>('');
  currentYear: number = new Date().getFullYear();
}
