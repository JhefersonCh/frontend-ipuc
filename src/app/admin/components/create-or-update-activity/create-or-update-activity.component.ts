import { Component, EventEmitter, inject, ViewChild } from '@angular/core';
import { BaseDialogComponent } from '../../../shared/components/base-dialog/base-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from '../../interfaces/activity.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-create-or-update-activity',
  imports: [
    BaseDialogComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    UploadFileComponent,
  ],
  templateUrl: './create-or-update-activity.component.html',
  styleUrl: './create-or-update-activity.component.scss',
})
export class CreateOrUpdateActivityComponent {
  @ViewChild('uploadFileComponent') uploadFileComponent!: UploadFileComponent;
  private readonly _dialogRef: MatDialogRef<CreateOrUpdateActivityComponent> =
    inject(MatDialogRef<CreateOrUpdateActivityComponent>);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  readonly data = inject<{ activity: Activity }>(MAT_DIALOG_DATA);
  form!: FormGroup;
  saveForm = new EventEmitter<Activity>();

  constructor() {
    this.form = this._fb.group({
      id: [this.data?.activity?.id],
      title: [this.data?.activity?.title, [Validators.required]],
      description: [this.data?.activity?.description, [Validators.required]],
      imageUrl: [this.data?.activity?.imageUrl, [Validators.required]],
      publicId: [this.data?.activity?.publicId],
    });
  }

  close() {
    this._dialogRef.close({ success: false, activity: this.form.value });
  }

  successClose() {
    this._dialogRef.close({ success: true, activity: this.form.value });
  }

  onSave() {
    this.saveForm.emit(this.form.value);
  }

  onFileUploaded(event: { url: string; publicId: string }) {
    this.form.get('imageUrl')?.setValue(event.url);
    this.form.get('publicId')?.setValue(event.publicId);
  }

  removeFile(publicId: string) {
    this.uploadFileComponent.removeFile(publicId);
  }
}
