import { Comment } from '../../interfaces/comment.interface';

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommentService } from '../../services/comment.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss',
})
export class CreateCommentComponent {
  postId: InputSignal<string | undefined> = input<string>();
  @Output() commentCreated = new EventEmitter<void>();

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _commentService: CommentService = inject(CommentService);

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      id: [uuid()],
      content: [''],
    });
  }

  sendComment(): void {
    const Comment = {
      content: this.form.value.content,
      postId: this.postId()!,
      parentId: null,
    };

    this._commentService.sendCreateComment(Comment).subscribe({
      next: (res) => {
        this.form.reset();
        this.commentCreated.emit();
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
      },
    });
  }
}
