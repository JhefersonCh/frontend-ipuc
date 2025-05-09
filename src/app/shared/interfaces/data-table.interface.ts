export type FieldType =
  | 'text'
  | 'select'
  | 'autocomplete'
  | 'date'
  | 'dateRange';

export interface SelectOption {
  value: any;
  label: string;
}

export interface ActionInterface {
  label: string;
  icon: string;
  color?: string;
  action?: (item?: any) => void;
  routerLink?: string[];
  queryParams?: any;
}

export interface SearchField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  validators?: any[];
  autocompleteOptions?: any[];
  defaultValue?: any;
  displayWith?: (value: any) => string;
  onAutocompleteChange?: (value: any) => void;
}
