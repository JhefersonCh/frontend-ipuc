import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-discussion',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-discussion.component.html',
  styleUrl: './create-discussion.component.scss',
})
export class CreateDiscussionComponent {
  discussionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.discussionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.discussionForm.valid) {
      console.log('Datos enviados:', this.discussionForm.value);
      // Aquí puedes agregar la lógica para enviar los datos a tu backend
    } else {
      console.log('Formulario inválido');
    }
  }
}
