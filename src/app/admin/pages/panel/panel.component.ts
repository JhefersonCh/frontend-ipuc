import { Component, OnInit } from '@angular/core';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';
import { ActivitiesComponent } from '../../components/activities/activities.component';
import { GeneralComponent } from '../../components/general/general.component';
import { Title } from '@angular/platform-browser';
import { ManageUsersComponent } from '../../components/manage-users/manage-users.component';
import { ManageForumComponent } from '../../components/manage-forum/manage-forum.component';
import { ManageEventsComponent } from '../../components/manage-events/manage-events.component';

@Component({
  selector: 'app-panel',
  imports: [
    HorizontalVerticalTabsComponent,
    TabComponent,
    ActivitiesComponent,
    GeneralComponent,
    ManageUsersComponent,
    ManageForumComponent,
    ManageEventsComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  selectedTabIdx: number = 0;

  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(
      'Panel de configuración - IPUC sede cuarta, Mocoa, Putumayo'
    );
  }

  onTabChange(event: { index: number; label: string }): void {
    this.selectedTabIdx = event.index;
  }
}
