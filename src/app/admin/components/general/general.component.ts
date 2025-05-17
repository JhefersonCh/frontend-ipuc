import { Component, inject, ViewChild } from '@angular/core';
import { HorizontalVerticalTabsComponent } from '../../../shared/components/horizontal-vertical-tabs/horizontal-vertical-tabs.component';
import { TabComponent } from '../../../shared/components/tab/tab.component';
import { HomeFormComponent } from '../home-form/home-form.component';
import { AboutFormComponent } from '../about-form/about-form.component';
import { HomeForm } from '../../interfaces/home.interface';
import { PanelService } from '../../services/panel.service';
import { AboutForm, GeneralForm } from '../../interfaces/about.interface';
import { GeneralFormComponent } from '../general-form/general-form.component';

@Component({
  selector: 'app-general',
  imports: [
    HorizontalVerticalTabsComponent,
    TabComponent,
    HomeFormComponent,
    AboutFormComponent,
    GeneralFormComponent,
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
})
export class GeneralComponent {
  private readonly _panelService: PanelService = inject(PanelService);
  @ViewChild('homeForm') homeForm?: HomeFormComponent;
  @ViewChild('aboutForm') aboutForm?: AboutFormComponent;
  @ViewChild('generalForm') generalForm?: GeneralFormComponent;

  tabIndex: number = 0;

  onSaveHomeForm(homeForm: HomeForm) {
    this._panelService.updateHome(homeForm).subscribe({
      next: () => {
        this.homeForm?.initForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSaveAboutForm(form: AboutForm) {
    this._panelService.updateAbout(form).subscribe({
      next: () => {
        this.aboutForm?.initForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSaveGeneralForm(form: GeneralForm) {
    this._panelService.updateGeneral(form).subscribe({
      next: () => {
        this.generalForm?.initForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onTabChange(tabIndex: number) {
    this.tabIndex = tabIndex;
  }
}
