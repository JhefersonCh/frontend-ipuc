import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { IpucInfoComponent } from '../../components/ipuc-info/ipuc-info.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { PanelService } from '../../../admin/services/panel.service';
import { HomeForm } from '../../../admin/interfaces/home.interface';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    IpucInfoComponent,
    ActivitiesComponent,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _panelService: PanelService = inject(PanelService);
  loading: boolean = false;

  data?: HomeForm;

  ngOnInit(): void {
    this.loading = true;
    this._panelService
      .getHome()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.data = res.data;
      });
  }
}
