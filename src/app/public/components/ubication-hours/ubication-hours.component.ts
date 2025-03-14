import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ubication-hours',
  imports: [MatIcon, CommonModule],
  templateUrl: './ubication-hours.component.html',
  styleUrl: './ubication-hours.component.scss',
})
export class UbicationHoursComponent {
  diasSemana: { nombre: string; evento: string }[] = [
    { nombre: 'Lunes', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Martes', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Miércoles', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Jueves', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Viernes', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Sábado', evento: 'Culto a las 8:00 PM' },
    { nombre: 'Domingo', evento: 'Culto a las 8:00 PM' },
  ];
}
