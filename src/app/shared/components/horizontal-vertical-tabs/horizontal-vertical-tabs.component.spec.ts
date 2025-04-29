import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalVerticalTabsComponent } from './horizontal-vertical-tabs.component';

describe('HorizontalVerticalTabsComponent', () => {
  let component: HorizontalVerticalTabsComponent;
  let fixture: ComponentFixture<HorizontalVerticalTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalVerticalTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalVerticalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
