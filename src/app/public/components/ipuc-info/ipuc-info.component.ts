import { Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ipuc-info',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './ipuc-info.component.html',
  styleUrl: './ipuc-info.component.scss',
})
export class IpucInfoComponent {
  additionalTitle: InputSignal<string> = input<string>('');
  additionalDescription: InputSignal<string> = input<string>('');
  enableRedirectToIpuc: InputSignal<boolean> = input<boolean>(false);
}
