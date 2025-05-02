import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateActivityComponent } from './create-or-update-activity.component';

describe('CreateOrUpdateActivityComponent', () => {
  let component: CreateOrUpdateActivityComponent;
  let fixture: ComponentFixture<CreateOrUpdateActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
