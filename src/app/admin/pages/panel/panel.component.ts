import { Component } from '@angular/core';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { GeneralComponent } from '../../components/general/general.component';

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
export class PanelComponent {}
