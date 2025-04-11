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
import { User } from '../../../shared/interfaces/user.interface';

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
  @Output() commentCreated = new EventEmitter<void>();

  postId: InputSignal<string | undefined> = input<string>();
  userLogged: InputSignal<User | null | undefined> = input<User | null>();

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _commentService: CommentService = inject(CommentService);

  form: FormGroup = this._fb.group({
    content: [''],
  });

  sendComment(): void {
    if (this.form.invalid || !this.userLogged()) return;

    const comment = {
      content: this.form.value.content,
      postId: this.postId()!,
      parentId: null,
    };

    this._commentService.createComment(comment).subscribe({
      next: () => {
        this.form.reset();
        this.commentCreated.emit();
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
      },
    });
  }

  handleFocus(event: FocusEvent): void {
    if (!this.userLogged()) {
      (event.target as HTMLTextAreaElement).blur();
    }
  }
}
