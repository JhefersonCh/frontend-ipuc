import { CommonModule } from '@angular/common';
import {
  endOfMonth,
  isSameDay,
  isSameMonth,
  differenceInDays,
  startOfMonth,
} from 'date-fns';
import { debounceTime, Subject } from 'rxjs';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Component, inject, OnInit } from '@angular/core';
import { PanelService } from '../../../admin/services/panel.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '../../../public/components/event-dialog/event-dialog.component';
import { EventInterface } from '../../../admin/interfaces/activity.interface';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    CalendarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CapitalizePipe,
    MatButtonToggleModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private readonly _panelService: PanelService = inject(PanelService);
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _dialog: MatDialog = inject(MatDialog);
  fontStyleControl = new FormControl('');
  fontStyle: string = 'month';
  form: FormGroup;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  selectedEvent?: EventInterface;
  eventsUnformated: EventInterface[] = [];

  constructor() {
    this.form = this._fb.group({
      initDate: [''],
      endDate: [''],
      perPage: [100],
      page: [1],
    });
  }

  ngOnInit(): void {
    this._getEvents();
    this._listenFormChanges();
  }

  private _listenFormChanges() {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this._getEvents();
    });
  }

  private _getEvents() {
    this._panelService
      .getEventsPaginatedList(this.form.value)
      .subscribe((events) => {
        this.eventsUnformated = events.data;
        this.events = events.data.map((event) => ({
          ...event,
          start: event?.date ? new Date(event.date) : new Date(),
          end: event?.date ? new Date(event.date) : new Date(),
          color: this.calulateColor(
            event?.date ? new Date(event.date) : new Date()
          ),
        }));
      });
  }

  calulateColor(date: Date): EventColor {
    const timeAgo = differenceInDays(date, new Date());
    console.log(timeAgo);
    if (timeAgo > 0) {
      return colors['blue'];
    }
    if (timeAgo === 1) {
      return colors['yellow'];
    }
    return colors['red'];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(event: CalendarEvent): void {
    this.selectedEvent = this.eventsUnformated.find((e) => e.id === event.id);
    this._openEvent(this.selectedEvent);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  reloadEvents() {
    const initDate = startOfMonth(this.viewDate);
    const endDate = endOfMonth(this.viewDate);
    this.form.patchValue({
      initDate: initDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  }

  private _openEvent(event?: EventInterface) {
    console.log(event);

    if (event) {
      this._dialog.open(EventDialogComponent, {
        data: {
          event,
        },
      });
    }
  }
}
