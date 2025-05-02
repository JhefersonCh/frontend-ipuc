import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  HostListener,
  input,
  InputSignal,
  OnInit,
  QueryList,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-horizontal-vertical-tabs',
  imports: [MatTabsModule, NgClass, NgTemplateOutlet],
  templateUrl: './horizontal-vertical-tabs.component.html',
  styleUrl: './horizontal-vertical-tabs.component.scss',
})
export class HorizontalVerticalTabsComponent implements OnInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  isMobile: boolean = false;
  isHorizontalPredetermined: InputSignal<boolean> = input<boolean>(false);

  constructor() {
    this.checkScreenSize();
  }
  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  tabTemplate(tab: TabComponent) {
    return {
      elementRef: (tab as any)._viewContainerRef.element.nativeElement,
    };
  }
}
