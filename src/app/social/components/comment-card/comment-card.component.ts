import {
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Comment } from '../../interfaces/comment.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardContent,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatCardHeader,
    CommonModule,
    FormsModule,
    MatCard,
    MatIcon,
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent implements OnChanges {
  @Output() deleteEvent = new EventEmitter<Comment>();
  @Output() commentCreated = new EventEmitter<void>();
  @Output() updateComment = new EventEmitter<{ id: string; content: string }>();

  private readonly _commentService: CommentService = inject(CommentService);
  private readonly _fb: FormBuilder = inject(FormBuilder);

  postId: InputSignal<string | undefined> = input<string>();
  userLogged: InputSignal<User | null | undefined> = input<User | null>();
  itemComment: InputSignal<Comment | undefined> = input<Comment>();

  showReply = false;
  replyContent = '';
  isEditing = false;
  editedContent = '';
  showReplies = false;
  replies: Comment[] = [];
  isExpanded = false;
  shouldShowToggle = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['itemComment']) {
      this.replies = this.itemComment()?.replies || [];
    }
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  toggleReply() {
    this.showReply = !this.showReply;
  }

  form: FormGroup = this._fb.group({
    content: [''],
  });

  sendReply(parentId: string) {
    if (this.form.invalid || !this.userLogged()) return;

    const comment = {
      content: this.form.value.content,
      postId: this.itemComment()?.postId!,
      parentId: parentId,
    };

    this._commentService.createComment(comment).subscribe({
      next: () => {
        this.form.reset();
        this.commentCreated.emit();
        this.showReply = false;
        this.showReplies = true;
      },
      error: (err) => {
        console.error('Error al crear comentario:', err);
      },
    });
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  handleFocus(event: FocusEvent): void {
    if (!this.userLogged()) {
      (event.target as HTMLTextAreaElement).blur();
    }
  }

  editComment() {
    this.isEditing = true;
    this.editedContent = this.itemComment()?.content || '';
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    const id = this.itemComment()?.id;
    const content = this.editedContent;

    if (!id || !content) return;

    const commentToUpdate: Comment = {
      id,
      content,
    } as Comment;

    this._commentService.updateComment(commentToUpdate).subscribe({
      next: () => {
        if (this.itemComment()) {
          this.itemComment()!.content = content;
        }
        this.isEditing = false;
      },
      error: (err) => {
        console.error('Error al actualizar comentario:', err);
      },
    });
  }
}
