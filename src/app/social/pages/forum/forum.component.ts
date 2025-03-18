import { Component, inject } from '@angular/core';
import { CreateOrEditDiscussionComponent } from '../../components/create-or-edit-discussion/create-or-edit-discussion.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Discussion } from '../../interfaces/forum.interface';
import { DiscussionCardComponent } from '../../components/discussion-card/discussion-card.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  imports: [MatButtonModule, DiscussionCardComponent],
  styleUrls: ['./forum.component.scss'],
  standalone: true,
})
export class ForumComponent {
  private readonly dialog = inject(MatDialog);
  items: Partial<Discussion>[] = [
    {
      id: 1,
      title: 'title 1 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 12,
      likes: 6,
    },
    {
      id: 2,
      title: 'title 2 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 4,
      likes: 2,
    },
    {
      id: 3,
      title: 'title 1 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 12,
      likes: 6,
    },
    {
      id: 4,
      title: 'title 2 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 4,
      likes: 2,
    },
    {
      id: 5,
      title: 'title 1 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 12,
      likes: 6,
    },
    {
      id: 6,
      title: 'title 2 ',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent gravida dolor vitae placerat aliquet. Phasellus congue bibendum bibendum. Sed ullamcorper vehicula arcu id consectetur. Donec at egestas elit. Quisque tempor libero eget dictum gravida. Suspendisse non metus ac ligula faucibus pretium. Ut ac fringilla nibh, et pulvinar leo. Maecenas sit amet risus tristique lorem varius consequat a a dolor. Aliquam tristique, augue consequat convallis pellentesque, purus neque malesuada nunc, ac convallis nulla risus quis eros. Mauris laoreet consectetur diam, a tempor ex ultricies vitae. Donec quis magna nunc. Nam lobortis urna sed nisi vulputate euismod. Duis viverra condimentum turpis, sit amet semper est pulvinar non. Nulla in odio ac lacus scelerisque mattis nec sit amet lectus.',
      createdAt: '2025-03-18T16:13:43.000Z',
      updatedAt: '2025-03-18T16:13:43.000Z',
      replies: 4,
      likes: 2,
    },
  ];

  openCreateOrEditDiscussionDialog() {
    const dialogRef = this.dialog.open(CreateOrEditDiscussionComponent);
  }
}
