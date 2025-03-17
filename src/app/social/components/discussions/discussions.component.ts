import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discussions',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.scss',
})
export class DiscussionsComponent {
  discussions = [
    {
      title: '¿Es TypeScript mejor que JavaScript?',
      description:
        'Comparte tu opinión sobre las ventajas y desventajas de TypeScript frente a JavaScript en proyectos modernos.',
    },
    {
      title: '¿Qué framework de frontend es el mejor?',
      description: 'React, Angular o Vue, ¿cuál prefieres y por qué?',
    },
    {
      title: '¿Microservicios o Monolito?',
      description:
        'Debatamos sobre cuál arquitectura es más efectiva según el tipo de proyecto.',
    },
    {
      title: '¿Es TypeScript mejor que JavaScript?',
      description:
        'Comparte tu opinión sobre las ventajas y desventajas de TypeScript frente a JavaScript en proyectos modernos.',
    },
    {
      title: '¿Qué framework de frontend es el mejor?',
      description: 'React, Angular o Vue, ¿cuál prefieres y por qué?',
    },
    {
      title: '¿Microservicios o Monolito?',
      description:
        'Debatamos sobre cuál arquitectura es más efectiva según el tipo de proyecto.',
    },
    {
      title: '¿Es TypeScript mejor que JavaScript?',
      description:
        'Comparte tu opinión sobre las ventajas y desventajas de TypeScript frente a JavaScript en proyectos modernos.',
    },
    {
      title: '¿Qué framework de frontend es el mejor?',
      description: 'React, Angular o Vue, ¿cuál prefieres y por qué?',
    },
    {
      title: '¿Microservicios o Monolito?',
      description:
        'Debatamos sobre cuál arquitectura es más efectiva según el tipo de proyecto.',
    },
  ];
}
