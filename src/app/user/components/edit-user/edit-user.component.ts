import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserDataService } from '../../services/user-data.service';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatButtonModule,
    UploadFileComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnChanges {
  @Input() user?: User;
  @Output() userUpdated = new EventEmitter<void>();

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _userService = inject(UserDataService);
  private readonly _router = inject(Router);

  form: FormGroup = this._fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    username: [''],
    avatarUrl: [''],
    publicId: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.updateFormData();
    }
  }

  private updateFormData(): void {
    this.form.patchValue({
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      email: this.user?.email,
      username: this.user?.username,
      avatarUrl: this.user?.avatarUrl,
      publicId: this.user?.publicId,
    });
  }

  saveInfo(): void {
    if (this.form.invalid || !this.user || !this.user.id) return;
    const userUpdate = this.form.value;
    this._userService.updateUserProfile(this.user.id, userUpdate).subscribe({
      next: (updatedUser) => {
        // Emitir el usuario actualizado
        this.userUpdated.emit(updatedUser);
        this._router.navigate([], {
          queryParams: { 'tab-panel': 0 },
          queryParamsHandling: 'merge',
        });
      },
      error: (error) => {
        console.error('Error al actualizar el usuario', error);
      },
    });
  }

  uploadImage(event: { url: string; publicId: string }) {
    this.form.patchValue({ avatarUrl: event.url, publicId: event.publicId });
  }
}
