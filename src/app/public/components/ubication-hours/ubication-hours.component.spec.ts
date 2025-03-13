import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationHoursComponent } from './ubication-hours.component';

describe('UbicationHoursComponent', () => {
  let component: UbicationHoursComponent;
  let fixture: ComponentFixture<UbicationHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicationHoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicationHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
