import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpucInfoComponent } from './ipuc-info.component';

describe('IpucInfoComponent', () => {
  let component: IpucInfoComponent;
  let fixture: ComponentFixture<IpucInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpucInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpucInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
