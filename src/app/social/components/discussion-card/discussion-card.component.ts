import {
  Component,
  EventEmitter,
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
  ],
  templateUrl: './discussion-card.component.html',
  styleUrl: './discussion-card.component.scss',
})
export class DiscussionCardComponent {
  item: InputSignal<Post | undefined> = input<Post>();
  @Output() deleteEvent = new EventEmitter<Post>();
  @Output() editEvent = new EventEmitter<Post>();
}
