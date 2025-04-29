import {
  Component,
  input,
  InputSignal,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  label: InputSignal<string> = input('');
  @ViewChild(TemplateRef, { static: true })
  template!: TemplateRef<any>;
}
