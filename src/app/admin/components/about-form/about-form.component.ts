import { Component, inject, output, OutputEmitterRef } from '@angular/core';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { finalize } from 'rxjs';
import { PanelService } from '../../services/panel.service';
import { AboutForm } from '../../interfaces/about.interface';

@Component({
  selector: 'app-about-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    LoaderComponent,
  ],
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.scss',
})
export class AboutFormComponent {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _panelService: PanelService = inject(PanelService);
  form: FormGroup;
  saveFormEvent: OutputEmitterRef<AboutForm> = output<AboutForm>({});
  isLoading: boolean = false;

  constructor() {
    this.form = this._fb.group({
      mission: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      ubicationUrl: ['', [Validators.required]],
      ubicationCoordinates: ['', [Validators.required]],
      enableRedirectToGoogleMaps: [false],
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.isLoading = true;
    this._panelService
      .getAbout()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        this.form.patchValue(res.data);
      });
  }

  onSave() {
    if (this.form.invalid) return;
    this.saveFormEvent.emit(this.form.value);
  }
}
