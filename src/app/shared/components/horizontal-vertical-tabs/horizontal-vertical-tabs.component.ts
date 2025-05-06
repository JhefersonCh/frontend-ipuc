import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  HostListener,
  input,
  InputSignal,
  OnInit,
  QueryList,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
  inject,
  OnDestroy,
} from '@angular/core';
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';
import { TabComponent } from '../tab/tab.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horizontal-vertical-tabs',
  imports: [MatTabsModule, NgTemplateOutlet],
  templateUrl: './horizontal-vertical-tabs.component.html',
  styleUrl: './horizontal-vertical-tabs.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class HorizontalVerticalTabsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _router: Router = inject(Router);
  private queryParamsSubscription: Subscription | null = null;

  isMobile: boolean = false;
  isHorizontalPredetermined: InputSignal<boolean> = input<boolean>(false);

  enableQueryParams: InputSignal<boolean> = input<boolean>(false);
  queryParamId: InputSignal<string> = input<string>('default');
  defaultTabIndex: InputSignal<number> = input<number>(0);

  instanceId: string = `tab-group-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  currentTabIndex: number = 0;

  private tabGroupElement: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
    if (this.enableQueryParams()) {
      this.queryParamsSubscription = this._activatedRoute.queryParams.subscribe(
        (params) => {
          const paramName = `tab-${this.queryParamId()}`;
          if (params[paramName] !== undefined) {
            this.currentTabIndex = parseInt(params[paramName], 10);
            if (this.tabGroup) {
              this.tabGroup.selectedIndex = this.currentTabIndex;
              this.cdr.detectChanges();
            }
          } else {
            this.currentTabIndex = this.defaultTabIndex();
          }
        }
      );
    } else {
      this.currentTabIndex = this.defaultTabIndex();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.applyStyles();
      if (this.tabGroup) {
        this.tabGroup.selectedIndex = this.currentTabIndex;
        this.cdr.detectChanges();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
    this.applyStyles();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  tabTemplate(tab: TabComponent) {
    return {
      elementRef: (tab as any)._viewContainerRef.element.nativeElement,
    };
  }

  shouldBeHorizontal(): boolean {
    return this.isHorizontalPredetermined() ? !this.isMobile : false;
  }

  private applyStyles(): void {
    this.tabGroupElement =
      this.el.nativeElement.querySelector('.mat-mdc-tab-group');

    if (this.tabGroupElement && this.shouldBeHorizontal()) {
      this.renderer.setStyle(this.tabGroupElement, 'flex-direction', 'row');

      const tabHeader = this.el.nativeElement.querySelector(
        '.mat-mdc-tab-header'
      );
      if (tabHeader) {
        this.renderer.setStyle(tabHeader, 'border-bottom', 'none');
      }

      const tabHeaderPagination = this.el.nativeElement.querySelectorAll(
        '.mat-mdc-tab-header-pagination'
      );
      tabHeaderPagination.forEach((element: Element) => {
        this.renderer.setStyle(element, 'display', 'none');
      });

      const tabLabels = this.el.nativeElement.querySelector(
        '.mat-mdc-tab-labels'
      );
      if (tabLabels) {
        this.renderer.setStyle(tabLabels, 'flex-direction', 'column');
      }

      const inkBar = this.el.nativeElement.querySelector('.mat-mdc-ink-bar');
      if (inkBar) {
        this.renderer.setStyle(inkBar, 'height', '100%');
        this.renderer.setStyle(inkBar, 'left', '98%');
      }

      const tabBodyWrapper = this.el.nativeElement.querySelector(
        '.mat-mdc-tab-body-wrapper'
      );
      if (tabBodyWrapper) {
        this.renderer.setStyle(tabBodyWrapper, 'flex', '1 1 auto');
        this.renderer.setStyle(tabBodyWrapper, 'padding-left', '1rem');
        this.renderer.setStyle(tabBodyWrapper, 'border-top', '1px solid #ccc');
        this.renderer.setStyle(tabBodyWrapper, 'border-left', '1px solid #ccc');
      }
    } else if (this.tabGroupElement) {
      this.renderer.removeStyle(this.tabGroupElement, 'flex-direction');

      const tabElements = [
        '.mat-mdc-tab-header',
        '.mat-mdc-tab-labels',
        '.mat-mdc-ink-bar',
        '.mat-mdc-tab-body-wrapper',
      ];

      tabElements.forEach((selector) => {
        const element = this.el.nativeElement.querySelector(selector);
        if (element) {
          if (selector === '.mat-mdc-tab-header') {
            this.renderer.removeStyle(element, 'border-bottom');
          } else if (selector === '.mat-mdc-tab-labels') {
            this.renderer.removeStyle(element, 'flex-direction');
          } else if (selector === '.mat-mdc-ink-bar') {
            this.renderer.removeStyle(element, 'height');
            this.renderer.removeStyle(element, 'left');
          } else if (selector === '.mat-mdc-tab-body-wrapper') {
            this.renderer.removeStyle(element, 'flex');
            this.renderer.removeStyle(element, 'padding-left');
            this.renderer.removeStyle(element, 'border-top');
            this.renderer.removeStyle(element, 'border-left');
          }
        }
      });

      const tabHeaderPagination = this.el.nativeElement.querySelectorAll(
        '.mat-mdc-tab-header-pagination'
      );
      tabHeaderPagination.forEach((element: Element) => {
        this.renderer.removeStyle(element, 'display');
      });
    }

    this.cdr.detectChanges();
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.currentTabIndex = event.index;

    if (this.enableQueryParams()) {
      const currentParams = { ...this._activatedRoute.snapshot.queryParams };
      const paramName = `tab-${this.queryParamId()}`;

      const updatedParams = {
        ...currentParams,
        [paramName]: event.index.toString(),
      };

      this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: updatedParams,
        queryParamsHandling: 'merge',
      });
    }

    this.cdr.detectChanges();
  }
}
