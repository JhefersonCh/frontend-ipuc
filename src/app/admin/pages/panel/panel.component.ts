import { Component, OnInit } from '@angular/core';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { GeneralComponent } from '../../components/general/general.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  imports: [
    HorizontalVerticalTabsComponent,
    TabComponent,
    ActivitiesComponent,
    GeneralComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(
      'Panel de configuración - IPUC sede cuarta, Mocoa, Putumayo'
    );
  }
}
