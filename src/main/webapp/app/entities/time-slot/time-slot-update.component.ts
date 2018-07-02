import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from './time-slot.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';
import { ITiming, Timing } from 'app/shared/model/timing.model';
import { TimingService } from 'app/entities/timing';

@Component({
    selector: 'jhi-time-slot-update',
    templateUrl: './time-slot-update.component.html'
})
export class TimeSlotUpdateComponent implements OnInit {
    private _timeSlot: ITimeSlot;
    private timings: ITiming[];
    isRemove: boolean;
    isSaving: boolean;
    private timing1: ITiming;

    hotels: IHotel[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private timeSlotService: TimeSlotService,
        private hotelService: HotelService,
        private timingService: TimingService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.timings = [];
        this.timings.push(new Timing());
        this.activatedRoute.data.subscribe(({ timeSlot }) => {
            this.timeSlot = timeSlot;
        });
        // this.activatedRoute.data.subscribe(({ timing }) => {
        //     this.timing = new Timing();
        // });
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        if (this.timeSlot.id) {
            this.timingService.findAllByTimeSlot(this.timeSlot.id).subscribe(
                (res: HttpResponse<ITiming[]>) => {
                    this.timings = res.body;
                    if (this.timings.length > 0) {
                        this.isRemove = true;
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.timeSlot.id !== undefined) {
            this.subscribeToSaveResponse(this.timeSlotService.updateWithTiming(this.timeSlot, this.timings));
        } else {
            this.subscribeToSaveResponse(this.timeSlotService.create(this.timeSlot, this.timings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITimeSlot>>) {
        result.subscribe((res: HttpResponse<ITimeSlot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackHotelById(index: number, item: IHotel) {
        return item.id;
    }
    get timeSlot() {
        return this._timeSlot;
    }

    set timeSlot(timeSlot: ITimeSlot) {
        this._timeSlot = timeSlot;
    }
    // get timing() {
    //     return this._timing;
    // }

    // set timing(timing: ITiming) {
    //     this._timing = timing;
    // }
    addField() {
        this.timing1 = new Timing();
        this.timing1.timeSlotDay = this._timeSlot.day;
        this.timing1.timeSlotId = this._timeSlot.id;
        this.timings.push(this.timing1);
        this.isRemove = true;
    }
    removeField() {
        this.timings.pop();
        if (this.timings.length <= 1) {
            this.isRemove = false;
        }
    }
}
