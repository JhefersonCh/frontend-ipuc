import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MapComponent } from '../../../shared/components/map/map.component';

@Component({
  selector: 'app-ubication-hours',
  imports: [MatIcon, CommonModule, MapComponent],
  templateUrl: './ubication-hours.component.html',
  styleUrl: './ubication-hours.component.scss',
})
export class UbicationHoursComponent {
  daysWeek: { name: string; event: string }[] = [
    { name: 'Martes', event: 'Culto a las 6:30 PM' },
    { name: 'Jueves', event: 'Culto a las 6:30 PM' },
    { name: 'Viernes', event: 'Culto a las 6:30 PM' },
    { name: 'Sábado', event: 'Culto a las 6:30 PM' },
    { name: 'Domingo', event: 'Culto a las 6:30 PM' },
  ];
}
