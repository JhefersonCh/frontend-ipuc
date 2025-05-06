import { Component, inject, OnInit } from '@angular/core';
import { VisionMissionComponent } from '../../components/vision-mission/vision-mission.component';
import { ValuesComponent } from '../../components/values/values.component';
import { UbicationHoursComponent } from '../../components/ubication-hours/ubication-hours.component';
import { IpucInfoComponent } from '../../components/ipuc-info/ipuc-info.component';
import { PanelService } from '../../../admin/services/panel.service';
import { AboutForm } from '../../../admin/interfaces/about.interface';
import { HomeForm } from '../../../admin/interfaces/home.interface';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { finalize } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    VisionMissionComponent,
    ValuesComponent,
    UbicationHoursComponent,
    IpucInfoComponent,
    LoaderComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  private readonly _panelService: PanelService = inject(PanelService);
  aboutData?: AboutForm;
  homeData?: HomeForm;
  loading: boolean = true;

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.initData();
    this.title.setTitle('Sobre nosotros - IPUC sede cuarta, Mocoa, Putumayo');
  }

  initData() {
    this.loading = true;
    this._panelService
      .getAbout()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.aboutData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    this._panelService.getHome().subscribe({
      next: (res) => {
        this.homeData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
