import {
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { Post } from '../../interfaces/forum.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { TimePipe } from '../../../shared/pipes/time.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { PostService } from '../../services/post.service';
import { User } from '../../../shared/interfaces/user.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-discussion-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    CapitalizePipe,
    TimePipe,
    TruncatePipe,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './discussion-card.component.html',
  styleUrl: './discussion-card.component.scss',
})
export class DiscussionCardComponent {
  private readonly _postService: PostService = inject(PostService);
  item: InputSignal<Post | undefined> = input<Post>();
  userLogged: InputSignal<User | null | undefined> = input<User | null>();
  @Output() deleteEvent = new EventEmitter<Post>();
  @Output() editEvent = new EventEmitter<Post>();
  @Output() likeEvent = new EventEmitter<unknown>();

  addLike() {
    this._postService.addLike(this.item()?.id || '').subscribe({
      next: () => this.likeEvent.emit(),
    });
  }

  removeLike() {
    this._postService.removeLike(this.item()?.id || '').subscribe({
      next: () => this.likeEvent.emit(),
    });
  }
}
