import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from 'app/entities/staff';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from 'app/entities/hotel-table';
import { IBooking, Booking } from 'app/shared/model/booking.model';
import { Observable } from 'rxjs';
import { BookingService } from 'app/entities/booking';

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './table-book.component.html'
})
export class TableBookComponent implements OnInit {
    hotel: IHotel;
    _booking: IBooking;
    isSaving: boolean;
    staff: IStaff[];
    hotelTables: IHotelTable[];
    hotelTable: IHotelTable;
    availableHotelTables: IHotelTable[];
    bookDateDp: any;
    moreGuest: boolean;
    constructor(private dataUtils: JhiDataUtils,
        private staffService: StaffService,
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
         private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = new Booking();
        });
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
            this.hotelTableService.getTablesByHotel(this.hotel.id).subscribe(
                (res: HttpResponse<IHotelTable[]>) => {
                    this.hotelTables = res.body;
                    if (this.hotelTables.length === 0) {
                        this.hotelTables = undefined;
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.hotelTableService.getTablesByHotelAndStatus(this.hotel.id, 'Available').subscribe(
                (res: HttpResponse<IHotelTable[]>) => {
                    this.availableHotelTables = res.body;
                    if (this.availableHotelTables.length === 0) {
                        this.availableHotelTables = undefined;
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    save() {
        this.isSaving = true;
        this._booking.hotelId = this.hotel.id;
        this.moreGuest = true;
       // this.subscribeToSaveResponse(this.bookingService.create(this.booking));
    }

    checkGuest() {
        this.hotelTableService.find(this._booking.hotelTableId).subscribe(
            (res: HttpResponse<IHotelTable>) => {
                this.hotelTable = res.body;
                if (this._booking.noOfGuest > this.hotelTable.noOfCustomer) {
                    this.moreGuest = true;
                } else {
                    this.moreGuest = false;
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
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

    get booking() {
        return this._booking;
    }

    set booking(booking: IBooking) {
        this._booking = booking;
    }
}
