import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeSlot } from 'app/shared/model/time-slot.model';

@Component({
    selector: 'jhi-time-slot-detail',
    templateUrl: './time-slot-detail.component.html'
})
export class TimeSlotDetailComponent implements OnInit {
    timeSlot: ITimeSlot;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timeSlot }) => {
            this.timeSlot = timeSlot;
        });
    }

    previousState() {
        window.history.back();
    }
}
