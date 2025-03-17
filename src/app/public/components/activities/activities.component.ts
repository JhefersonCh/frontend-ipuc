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
      title: 'CULTOS',
      image: './images/home/activities/cultos.webp',
      description:
        'Nuestros cultos son encuentros espirituales para adorar a Dios, aprender de la Biblia y orar en comunidad. Fortalecen nuestra fe, unidad y crecimiento espiritual.',
    },
    {
      title: 'CAMPAMENTOS',
      image: './images/home/activities/camps.webp',
      description:
        'Disfruta de nuestros campamentos cristianos en la naturaleza. Son espacios para fortalecer la fe, compartir experiencias y participar en actividades recreativas, creando lazos fraternales.',
    },
    {
      title: 'REFAM',
      image: './images/home/activities/refam.webp',
      description:
        'La Reunión Familiar (REFAM) es clave para unir a nuestra iglesia y familias. Compartimos enseñanzas bíblicas, testimonios y adoración para edificar hogares con valores cristianos.',
    },
    {
      title: 'AYUNOS',
      image: './images/home/activities/ayuno.webp',
      description:
        'El ayuno es una práctica voluntaria para buscar una conexión profunda con Dios a través de la abstinencia de alimentos, la oración y la reflexión, siguiendo el ejemplo de Jesús.',
    },
    {
      title: 'VIGILIAS',
      image: './images/home/activities/vigilia.webp',
      description:
        'Las vigilias son reuniones nocturnas dedicadas a la oración, el estudio bíblico y la comunión con Dios, fortaleciendo nuestra relación espiritual en comunidad.',
    },
    {
      title: 'CONVENCIONES',
      image: './images/home/activities/convencion.webp',
      description:
        'Participa en nuestras convenciones, eventos más amplios que reúnen a personas de diferentes lugares para disfrutar de enseñanzas inspiradoras, talleres y compañerismo cristiano.',
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
