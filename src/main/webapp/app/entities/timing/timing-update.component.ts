import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITiming } from 'app/shared/model/timing.model';
import { TimingService } from './timing.service';
import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from 'app/entities/time-slot';

@Component({
    selector: 'jhi-timing-update',
    templateUrl: './timing-update.component.html'
})
export class TimingUpdateComponent implements OnInit {
    private _timing: ITiming;
    isSaving: boolean;

    timeslots: ITimeSlot[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private timingService: TimingService,
        private timeSlotService: TimeSlotService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ timing }) => {
            this.timing = timing;
        });
        this.timeSlotService.query().subscribe(
            (res: HttpResponse<ITimeSlot[]>) => {
                this.timeslots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.timing.id !== undefined) {
            this.subscribeToSaveResponse(this.timingService.update(this.timing));
        } else {
            this.subscribeToSaveResponse(this.timingService.create(this.timing));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITiming>>) {
        result.subscribe((res: HttpResponse<ITiming>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTimeSlotById(index: number, item: ITimeSlot) {
        return item.id;
    }
    get timing() {
        return this._timing;
    }

    set timing(timing: ITiming) {
        this._timing = timing;
    }
}
