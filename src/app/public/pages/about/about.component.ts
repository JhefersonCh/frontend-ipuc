import { Component } from '@angular/core';
import { VisionMissionComponent } from '../../components/vision-mission/vision-mission.component';
import { ValuesComponent } from '../../components/values/values.component';
import { UbicationHoursComponent } from '../../components/ubication-hours/ubication-hours.component';
import { IpucInfoComponent } from '../../components/ipuc-info/ipuc-info.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    VisionMissionComponent,
    ValuesComponent,
    UbicationHoursComponent,
    IpucInfoComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
