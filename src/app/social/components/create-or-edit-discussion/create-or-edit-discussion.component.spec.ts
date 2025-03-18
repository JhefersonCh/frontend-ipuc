import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditDiscussionComponent } from './create-or-edit-discussion.component';

describe('CreateOrEditDiscussionComponent', () => {
  let component: CreateOrEditDiscussionComponent;
  let fixture: ComponentFixture<CreateOrEditDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditDiscussionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
