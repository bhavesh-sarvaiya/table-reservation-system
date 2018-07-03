import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStaff } from 'app/shared/model/staff.model';
import { Principal } from 'app/core';
import { StaffService } from './staff.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelTableService } from 'app/entities/hotel-table';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-staff',
    templateUrl: './staff.component.html'
})
export class StaffComponent implements OnInit, OnDestroy {
    staff: IStaff[];
    currentAccount: any;
    eventSubscriber: Subscription;
    hotels: IHotel[];
    hotel: number;

    constructor(
        private staffService: StaffService,
        private jhiAlertService: JhiAlertService,
        private hotelTableService: HotelTableService,
        private eventManager: JhiEventManager,
        private hotelService: HotelService,
        private principal: Principal
    ) {}

    loadAll() {
        this.staffService.query().subscribe(
            (res: HttpResponse<IStaff[]>) => {
                this.staff = res.body;
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
        this.registerChangeInStaff();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStaff) {
        return item.id;
    }

    registerChangeInStaff() {
        this.eventSubscriber = this.eventManager.subscribe('staffListModification', response => this.loadAll());
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
        this.staffService.query().subscribe(
            (res: HttpResponse<IStaff[]>) => {
                this.staff = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    } else {
        this.staffService.getStaffByHotel(this.hotel).subscribe(
            (res: HttpResponse<IStaff[]>) => {
                this.staff = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
}
}
}
