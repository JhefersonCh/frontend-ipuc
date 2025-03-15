import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseCardWithoutActionsComponent } from '../../../shared/components/base-card-without-actions/base-card-without-actions.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-activities',
  imports: [
    MatCardModule,
    BaseCardWithoutActionsComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  activities = [
    {
      title: 'CAMPAMENTOS',
      image: './images/home/activities/camps.webp',
      description:
        'Los campamentos cristianos son encuentros especiales donde los participantes se sumergen en la naturaleza para fortalecer su fe, compartir experiencias y disfrutar de actividades recreativas en comunidad. Estos eventos combinan momentos de reflexión espiritual con dinámicas de integración, creando un ambiente propicio para el crecimiento personal y la construcción de lazos fraternales.',
    },
    {
      title: 'REFAM',
      image: './images/home/activities/refam.webp',
      description:
        'La Reunión Familiar (REFAM) es una actividad central en nuestra comunidad, diseñada para fortalecer los lazos entre los miembros de la iglesia y sus familias. Durante estos encuentros, compartimos enseñanzas bíblicas, testimonios y momentos de adoración que buscan edificar y unir a cada integrante, promoviendo valores cristianos en el núcleo familiar.',
    },
    {
      title: 'AYUNOS',
      image: './images/home/activities/ayuno.webp',
      description:
        'El ayuno es una práctica espiritual que implica abstenerse de alimentos durante un período determinado con el propósito de buscar una conexión más profunda con Dios. En nuestra iglesia, los ayunos se realizan de manera voluntaria y se acompañan de oración y reflexión, siguiendo el ejemplo de Jesucristo, quien ayunó durante cuarenta días en el desierto.',
    },
    {
      title: 'CAMPAMENTOS',
      image: './images/home/activities/camps.webp',
      description:
        'Los campamentos cristianos son encuentros especiales donde los participantes se sumergen en la naturaleza para fortalecer su fe, compartir experiencias y disfrutar de actividades recreativas en comunidad. Estos eventos combinan momentos de reflexión espiritual con dinámicas de integración, creando un ambiente propicio para el crecimiento personal y la construcción de lazos fraternales.',
    },
    {
      title: 'REFAM',
      image: './images/home/activities/refam.webp',
      description:
        'La Reunión Familiar (REFAM) es una actividad central en nuestra comunidad, diseñada para fortalecer los lazos entre los miembros de la iglesia y sus familias. Durante estos encuentros, compartimos enseñanzas bíblicas, testimonios y momentos de adoración que buscan edificar y unir a cada integrante, promoviendo valores cristianos en el núcleo familiar.',
    },
    {
      title: 'AYUNOS',
      image: './images/home/activities/ayuno.webp',
      description:
        'El ayuno es una práctica espiritual que implica abstenerse de alimentos durante un período determinado con el propósito de buscar una conexión más profunda con Dios. En nuestra iglesia, los ayunos se realizan de manera voluntaria y se acompañan de oración y reflexión, siguiendo el ejemplo de Jesucristo, quien ayunó durante cuarenta días en el desierto.',
    },
  ];

  scrollLeftClick() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  scrollRightClick() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }
}
