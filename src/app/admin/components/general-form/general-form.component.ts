import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PanelService } from '../../services/panel.service';
import { GeneralForm } from '../../interfaces/about.interface';
import { finalize } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';

@Component({
  selector: 'app-general-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    LoaderComponent,
    UploadFileComponent,
  ],
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
})
export class GeneralFormComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _panelService: PanelService = inject(PanelService);
  form: FormGroup;
  saveFormEvent: OutputEmitterRef<GeneralForm> = output<GeneralForm>({});
  isLoading: boolean = false;

  constructor() {
    this.form = this._fb.group({
      appName: ['', [Validators.required]],
      logoUrl: ['', [Validators.required]],
      logoPublicId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.isLoading = true;
    this._panelService
      .getGeneral()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
  }

  onFileUploaded(event: { url: string; publicId: string }) {
    this.form.get('logoUrl')?.setValue(event.url);
    this.form.get('logoPublicId')?.setValue(event.publicId);
  }

  onSave() {
    if (this.form.invalid) return;
    this.saveFormEvent.emit(this.form.value);
  }
}
