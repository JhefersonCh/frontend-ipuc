import {
  Component,
  inject,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UploadFileComponent } from '../../../shared/components/upload-file/upload-file.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HomeForm } from '../../interfaces/home.interface';
import { PanelService } from '../../services/panel.service';
import { finalize } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    UploadFileComponent,
    MatSlideToggleModule,
    LoaderComponent,
  ],
  templateUrl: './home-form.component.html',
  styleUrl: './home-form.component.scss',
})
export class HomeFormComponent implements OnInit {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _panelService: PanelService = inject(PanelService);
  form: FormGroup;
  saveFormEvent: OutputEmitterRef<HomeForm> = output<HomeForm>({});
  isLoading: boolean = false;

  constructor() {
    this.form = this._fb.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      heroUrl: ['', [Validators.required]],
      heroPublicId: ['', [Validators.required]],
      additionalTitle: ['', [Validators.required]],
      additionalDescription: ['', [Validators.required]],
      enableRedirectToIpuc: [false],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.isLoading = true;
    this._panelService
      .getHome()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
  }

  onFileUploaded(event: { url: string; publicId: string }) {
    this.form.get('heroUrl')?.setValue(event.url);
    this.form.get('heroPublicId')?.setValue(event.publicId);
  }

  onSave() {
    if (this.form.invalid) return;
    this.saveFormEvent.emit(this.form.value);
  }
}
