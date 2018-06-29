import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from './time-slot.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-time-slot-update',
    templateUrl: './time-slot-update.component.html'
})
export class TimeSlotUpdateComponent implements OnInit {
    private _timeSlot: ITimeSlot;
    isSaving: boolean;

    hotels: IHotel[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private timeSlotService: TimeSlotService,
        private hotelService: HotelService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ timeSlot }) => {
            this.timeSlot = timeSlot;
        });
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.timeSlot.id !== undefined) {
            this.subscribeToSaveResponse(this.timeSlotService.update(this.timeSlot));
        } else {
            this.subscribeToSaveResponse(this.timeSlotService.create(this.timeSlot));
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
}
