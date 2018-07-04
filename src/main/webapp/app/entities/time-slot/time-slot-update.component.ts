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
import { element } from 'protractor';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
    isInvalid: boolean;
    errorMessage: string;

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
                    if (this.timings.length > 1) {
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
        this.isInvalid = false;
        this.checkValidation2();
        if (!this.isInvalid) {
            this.isSaving = true;
        if (this.timeSlot.id !== undefined) {
            this.subscribeToSaveResponse(this.timeSlotService.updateWithTiming(this.timeSlot, this.timings));
        } else {
                this.subscribeToSaveResponse(this.timeSlotService.create(this.timeSlot, this.timings));
            }
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
        this.isInvalid = false;
        this.checkValidationWhenGtrTwoLength();
        if (!this.isInvalid) {
        this.timings.push(this.timing1);
        this.isRemove = true;
        }
    }
    removeField() {
        this.timings.pop();
        if (this.timings.length <= 1) {
            this.isRemove = false;
        }
    }
    checkValidationWhenGtrTwoLength() {
        this.isInvalid = false;
        const length = this.timings.length;
        if (length >= 2) {
            const prevElement = this.timings[length - 2];
            const currElement = this.timings[length - 1];
            this.checkValidation(currElement);
            const peeTime = prevElement.endTime;
            const cesTime = currElement.startTime;
            const phour = peeTime.split(':');
            const chour = cesTime.split(':');
            if (peeTime !== cesTime) {
                if (phour[0] === chour[0]) {
                    if (parseInt(phour[1], 0) > parseInt(chour[1], 0)) {
                        this.errorMessage = 'Last time-slot\'s start time should be greater than or equal to previous time-slot\'s end time';
                        this.isInvalid = true;
                    }
                } else {
                    if (parseInt(phour[0], 0) > parseInt(chour[0], 0)) {
                        this.errorMessage = 'Last time-slot\'s start time should be greater than or equal to previous time-slot\'s end time';
                        this.isInvalid = true;
                    }
                }
            }
        } else if (length >= 1) {
            this.checkValidation(this.timings[length - 1]);
        }
    }
    checkValidation(element1) {
        // this.isInvalid = false;
            const stime = element1.startTime;
            const etime = element1.endTime;
            if (!stime) {
                this.errorMessage = 'Start time is undefined';
                this.isInvalid = true;
            } else if (!etime) {
                this.errorMessage = 'End time is undefined';
             this.isInvalid = true;
         } else {
            if (stime === etime) {
                this.errorMessage = 'Time slot must be different ';
             this.isInvalid = true;
         } else {
                 const shour = stime.split(':');
                 const ehour = etime.split(':');
                 if (shour[0] === ehour[0]) {
                      if (parseInt(shour[1], 0) >= parseInt(ehour[1], 0)) {
                         this.errorMessage = 'Start time must be less than the end time';
                         this.isInvalid = true;
                     }
                 } else {
                    if (parseInt(shour[0], 0) > parseInt(ehour[0], 0)) {
                        this.errorMessage = 'Start time must be less than the end time';
                        this.isInvalid = true;
                    }
                 }
            }
        }
    }

    checkValidation2() {
        if (this.timings.length >= 1) {
            let i = 0;
            this.timings.forEach(element1 => {
                if (i >= 1) {
                    const prevElement = this.timings[i - 1];
                    const currElement = this.timings[i];
                    const peeTime = prevElement.endTime;
                    const cesTime = currElement.startTime;
                    if ( this.timings.length - 1 === i) {
                        this.checkValidation(this.timings[i]);
                    }
                    const phour = peeTime.split(':');
                    const chour = cesTime.split(':');
                    if (peeTime !== cesTime) {
                        if (phour[0] === chour[0]) {
                            if (parseInt(phour[1], 0) > parseInt(chour[1], 0)) {
                                this.errorMessage = 'Time-slot invalid';
                                this.isInvalid = true;
                                return false;
                            }
                        } else {
                            if (parseInt(phour[0], 0) > parseInt(chour[0], 0)) {
                                this.errorMessage = 'Time-slot invalid';
                                this.isInvalid = true;
                                return false;
                            }
                        }
                    }
                    if (!this.isInvalid) {
                        this.checkValidation(currElement);
                    }
                } else {
                    this.checkValidation(this.timings[i]);
                }
            i++;
            });
        }
    }
}
