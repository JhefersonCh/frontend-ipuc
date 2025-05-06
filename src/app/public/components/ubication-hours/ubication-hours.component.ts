import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MapComponent } from '../../../shared/components/map/map.component';

@Component({
  selector: 'app-ubication-hours',
  imports: [MatIcon, CommonModule, MapComponent],
  templateUrl: './ubication-hours.component.html',
  styleUrl: './ubication-hours.component.scss',
})
export class UbicationHoursComponent {
  ubicationUrl: InputSignal<string> = input<string>('');
  ubicationCoordinates: InputSignal<string> = input<string>('');
  enableRedirectToGoogleMaps: InputSignal<boolean> = input<boolean>(false);
  daysWeek: { name: string; event: string }[] = [
    { name: 'Martes', event: 'Culto a las 6:30 PM' },
    { name: 'Jueves', event: 'Culto a las 6:30 PM' },
    { name: 'Viernes', event: 'Culto a las 6:30 PM' },
    { name: 'Sábado', event: 'Culto a las 6:30 PM' },
    { name: 'Domingo', event: 'Escuela Dominical a las 9:00 AM' },
  ];

  transformCoordinates(): [number, number] {
    const coordinates = this.ubicationCoordinates()
      .replace('[', '')
      .replace(']', '')
      .split(',');
    const coordinatesTransformed: [number, number] = [
      Number(coordinates[0]),
      Number(coordinates[1]),
    ];
    return coordinatesTransformed;
  }
}
