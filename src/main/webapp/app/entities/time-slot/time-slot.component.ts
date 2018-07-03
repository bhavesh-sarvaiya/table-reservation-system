import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITimeSlot } from 'app/shared/model/time-slot.model';
import { Principal } from 'app/core';
import { TimeSlotService } from './time-slot.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-time-slot',
    templateUrl: './time-slot.component.html'
})
export class TimeSlotComponent implements OnInit, OnDestroy {
    timeSlots: ITimeSlot[];
    currentAccount: any;
    eventSubscriber: Subscription;
    hotels: IHotel[];
    hotel: number;

    constructor(
        private timeSlotService: TimeSlotService,
        private jhiAlertService: JhiAlertService,
        private hotelService: HotelService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.timeSlotService.query().subscribe(
            (res: HttpResponse<ITimeSlot[]>) => {
                this.timeSlots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.getHotels();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTimeSlots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITimeSlot) {
        return item.id;
    }

    registerChangeInTimeSlots() {
        this.eventSubscriber = this.eventManager.subscribe('timeSlotListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    getHotels() {
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    changeHotel() {
        if (this.hotel === 1) {
            this.timeSlotService.query().subscribe(
                (res: HttpResponse<ITimeSlot[]>) => {
                    this.timeSlots = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.timeSlotService.findAllByHotel(this.hotel).subscribe(
                (res: HttpResponse<ITimeSlot[]>) => {
                    this.timeSlots = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    }
}
