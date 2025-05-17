import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCommentComponent } from './create-or-edit-comment.component';

describe('CreateOrEditCommentComponent', () => {
  let component: CreateOrEditCommentComponent;
  let fixture: ComponentFixture<CreateOrEditCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrEditCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
