import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BaseCardComponent } from '../../../shared/components/base-card/base-card.component';
import { PanelService } from '../../services/panel.service';
import { Activity } from '../../interfaces/activity.interface';
import { CreateOrUpdateActivityComponent } from '../create-or-update-activity/create-or-update-activity.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { YesNoDialohComponent } from '../../../shared/components/yes-no-dialoh/yes-no-dialoh.component';

@Component({
  selector: 'app-activities',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    BaseCardComponent,
    MatDialogModule,
    MatMenuModule,
    YesNoDialohComponent,
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent implements OnInit {
  private readonly _panelService: PanelService = inject(PanelService);
  private readonly _dialog: MatDialog = inject(MatDialog);
  activities: Activity[] = [];

  ngOnInit(): void {
    this._getActivities();
  }

  private _getActivities() {
    this._panelService.getActivities().subscribe((activities) => {
      this.activities = activities.data;
    });
  }

  private _addActivity(
    activity: Activity,
    dialog: MatDialogRef<CreateOrUpdateActivityComponent>
  ) {
    delete activity.id;
    this._panelService.addActivity(activity).subscribe({
      next: () => {
        dialog.componentInstance.successClose();
      },
      error: (err) => {
        console.log(err);
        activity?.publicId &&
          dialog.componentInstance.removeFile(activity?.publicId);
      },
    });
  }

  private _updateActivity(
    activity: Activity,
    dialog: MatDialogRef<CreateOrUpdateActivityComponent>
  ) {
    if (activity.id) {
      this._panelService.updateActivity(activity).subscribe({
        next: () => {
          dialog.componentInstance.successClose();
        },
        error: (err) => {
          console.log(err);
          activity?.publicId &&
            dialog.componentInstance.removeFile(activity?.publicId);
        },
      });
    }
  }

  openCreateOrUpdateDialog(activity?: Activity) {
    const dialogRef = this._dialog.open(CreateOrUpdateActivityComponent, {
      data: { activity },
    });

    dialogRef.componentInstance.saveForm.subscribe((activity) => {
      if (activity.id) {
        this._updateActivity(activity, dialogRef);
      } else {
        this._addActivity(activity, dialogRef);
      }
    });

    dialogRef.afterClosed().subscribe((value) => {
      this._getActivities();
      if (!value?.success) {
        const publicId =
          value?.activity?.publicId ||
          dialogRef.componentInstance.form.get('publicId')?.value;

        publicId &&
          !activity?.id &&
          dialogRef.componentInstance.removeFile(publicId);
      }
    });
  }

  openDeleteDialog(id: string) {
    const dialogRef = this._dialog.open(YesNoDialohComponent, {
      data: {
        title: 'Eliminar actividad',
        message: '¿Estás seguro de eliminar esta actividad?',
      },
    });

    dialogRef.componentInstance.yesEvent.subscribe(() => {
      this._deleteActivity(id, dialogRef);
    });
  }

  private _deleteActivity(
    id: string,
    dialogRef: MatDialogRef<YesNoDialohComponent>
  ) {
    this._panelService.deleteActivity(id).subscribe(() => {
      this._getActivities();
      dialogRef.close();
    });
  }
}
