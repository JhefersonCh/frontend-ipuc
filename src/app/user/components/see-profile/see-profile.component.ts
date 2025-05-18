import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { UserDataService } from '../../services/user-data.service';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { MatIconModule } from '@angular/material/icon';
import { StatisticsInterface } from '../../interface/profile.interface';
import { DatePipe } from '@angular/common';
import { DiscussionCardComponent } from '../../../social/components/discussion-card/discussion-card.component';

@Component({
  selector: 'app-see-profile',
  standalone: true,
  imports: [
    LoaderComponent,
    ReactiveFormsModule,
    MatIconModule,
    DiscussionCardComponent,
  ],
  templateUrl: './see-profile.component.html',
  styleUrl: './see-profile.component.scss',
  providers: [DatePipe],
})
export class SeeProfileComponent implements OnChanges {
  @Input() user?: User;

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _userService: UserDataService = inject(UserDataService);
  private readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  constructor(private datePipe: DatePipe) {}

  isLoading: boolean = false;
  formattedDate: string | null = null;
  statistics?: StatisticsInterface;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['user']?.currentValue !== changes['user']?.previousValue &&
      this.user
    ) {
      this.getStatistics();
      this.cdRef.detectChanges();
      this.formatDate();
    }
  }

  private formatDate(): void {
    const date = this.user?.createdAt;
    if (date) {
      const formatted = this.datePipe.transform(
        date,
        "d 'de' MMMM 'de' y",
        'es-ES'
      );
      this.formattedDate = `Te uniste el ${formatted}`;
    }
  }

  /**
   * @param getStatistics - Carga las estadísticas del usuario.
   */
  private getStatistics(): void {
    this.isLoading = true;

    this._userService
      .getStatistics()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          this.statistics = response.data;
        },
        error: (error) => {
          console.error('Error al obtener las estadísticas', error);
        },
      });
  }
}
