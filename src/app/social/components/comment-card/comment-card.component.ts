import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Comment, Reply } from '../../interfaces/comment.interface';
import { User } from '../../../shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    CommonModule,
  ],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  @Output() deleteEvent = new EventEmitter<Comment>();
  @Output() editEvent = new EventEmitter<Comment>();

  userLogged: InputSignal<User | null | undefined> = input<User | null>();
  itemComment: InputSignal<Comment | undefined> = input<Comment>();
  itemReply: InputSignal<Reply | undefined> = input<Reply>();
}
