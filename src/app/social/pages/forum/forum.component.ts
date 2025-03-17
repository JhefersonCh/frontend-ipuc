import { Component } from '@angular/core';
import { DiscussionsComponent } from '../../components/discussions/discussions.component';

@Component({
  selector: 'app-forum',
  imports: [DiscussionsComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
})
export class ForumComponent {}
