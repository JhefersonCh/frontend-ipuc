import {
  Component,
  inject,
  Input,
  input,
  InputSignal,
  OnInit,
  output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchField } from '../../interfaces/data-table.interface';

@Component({
  selector: 'app-search-fields',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './search-fields.component.html',
  styleUrl: './search-fields.component.scss',
})
export class SearchFieldsComponent implements OnInit {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  searchFields: InputSignal<SearchField[]> = input<SearchField[]>([]);
  @Input() form!: FormGroup;
  debounceTime: InputSignal<number> = input<number>(300);
  withSubmitButton: InputSignal<boolean> = input<boolean>(false);

  searchChange = output<any>();
  searchSubmit = output<any>();
  formReady = output<FormGroup>();

  ngOnInit() {
    if (!this.form) {
      this.initializeForm();
    }
    this.formReady.emit(this.form);

    this.form?.valueChanges
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        debounceTime(this.debounceTime())
      )
      .subscribe((value) => {
        this.emitSearchChange(value);
      });

    this._listenAutocompleteChanges();
  }

  getFormLength(): number {
    return this.searchFields().length;
  }

  private _listenAutocompleteChanges(): void {
    this.searchFields().map((field) => {
      if (field.type === 'autocomplete') {
        this.form
          ?.get(field.name)
          ?.valueChanges.pipe(debounceTime(this.debounceTime()))
          .subscribe((value) => {
            field.onAutocompleteChange?.(value);
          });
      }
    });
  }

  private initializeForm(): void {
    const group: any = {};

    this.searchFields()?.forEach((field) => {
      if (field.type !== 'dateRange') {
        group[field.name] = [field.defaultValue || '', field.validators || []];
      } else {
        group[field.name + 'Init'] = [''];
        group[field.name + 'End'] = [''];
      }
    });

    this.form = this._fb.group(group);
  }

  private emitSearchChange(value: any): void {
    const filteredValues = Object.entries(value).reduce((acc, [key, val]) => {
      if (val !== null && val !== '' && val !== undefined) {
        acc[key] = val;
      }
      return acc;
    }, {} as any);

    this.searchChange.emit({
      value: filteredValues,
      length: Object.keys(filteredValues).length,
    });
  }

  public submitSearch(): void {
    if (this.form?.valid) {
      this.searchSubmit.emit(this.form?.value);
    }
  }

  public reset(): void {
    Object.keys(this.form?.controls).forEach((key) =>
      this.form?.get(key)?.setValue(null)
    );
    this.searchChange.emit({});
  }
}
