import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBooking } from 'app/shared/model/booking.model';
import { BookingService } from './booking.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';
import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from 'app/entities/hotel-table';

@Component({
    selector: 'jhi-booking-update',
    templateUrl: './booking-update.component.html'
})
export class BookingUpdateComponent implements OnInit {
    private _booking: IBooking;
    isSaving: boolean;

    hotels: IHotel[];

    hoteltables: IHotelTable[];
    bookDateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private hotelService: HotelService,
        private hotelTableService: HotelTableService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = booking;
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
        if (this.booking.id !== undefined) {
            this.subscribeToSaveResponse(this.bookingService.update(this.booking));
        } else {
            this.subscribeToSaveResponse(this.bookingService.create(this.booking));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBooking>>) {
        result.subscribe((res: HttpResponse<IBooking>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHotelTableById(index: number, item: IHotelTable) {
        return item.id;
    }
    get booking() {
        return this._booking;
    }

    set booking(booking: IBooking) {
        this._booking = booking;
    }
    // custom method

    findTableByHotel() {
        this.hotelTableService.getTablesByHotel(this._booking.hotelId).subscribe(
            (res: HttpResponse<IHotelTable[]>) => {
                this.hoteltables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
}
