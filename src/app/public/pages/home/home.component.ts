import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { IpucInfoComponent } from '../../components/ipuc-info/ipuc-info.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, IpucInfoComponent, ActivitiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
