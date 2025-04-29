import { Component } from '@angular/core';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';

@Component({
  selector: 'app-panel',
  imports: [HorizontalVerticalTabsComponent, TabComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent {}
