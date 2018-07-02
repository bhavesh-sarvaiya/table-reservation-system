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
import { TimingService } from 'app/entities/timing';
import { ITiming } from 'app/shared/model/timing.model';
import { ITimeSlot, DayName } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from 'app/entities/time-slot';

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './table-book.component.html'
})
export class TableBookComponent implements OnInit {
    hotel: IHotel;
    _booking: IBooking;
    isSaving: boolean;
    staff: IStaff[];
    timeSlot: string[];
    timeSlots: ITimeSlot;
    hotelTables: IHotelTable[];
    hotelTable: IHotelTable;
    availableHotelTables: IHotelTable[];
    bookDateDp: any;
    moreGuest: boolean;
    success: boolean;
    private timings: ITiming[];
    tableLength: number;

    constructor(
        private dataUtils: JhiDataUtils,
        private timingService: TimingService,
        private staffService: StaffService,
        private timeSlotService: TimeSlotService,
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = new Booking();
        });
        this.timeSlot = [];
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
            this.hotelTableService.findAllByHotelAndStatusBasedOnStaff(this.hotel.id, 'Available').subscribe(
                (res: HttpResponse<IHotelTable[]>) => {
                    this.hotelTables = res.body;
                    this.tableLength = this.hotelTables.length;
                    if ( this.tableLength === 0) {
                        this.hotelTables = undefined;
                        this.tableLength = undefined;
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

        // if (this._booking.bookDate) {
        //     const d = this._booking.bookDate.toString().split('-');
        //     this._booking.bookDate = {
        //         year: d[0], month: d[1], day: d[2]
        //     };
        // }

        this._booking.hotelId = this.hotel.id;
        if (this._booking.hotelTableId !== undefined) {
            if (this._booking.noOfGuest > this.hotelTable.noOfCustomer) {
                this.moreGuest = true;
            } else {
                this.moreGuest = false;
                this.subscribeToSaveResponse(this.bookingService.create(this.booking));
            }
        }
    }

    checkGuest() {
        if (this._booking.hotelTableId !== undefined && this._booking.noOfGuest !== undefined) {
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
        this.success = true;
        this.ngOnInit();
        // this.previousState();
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

    private dateChange() {
        this.timeSlot = [];
        let d;
        if (this._booking.bookDate) {
            d = new Date(this._booking.bookDate.toString()).getDay();
        } else {
            d = new Date().getDay();
        }
        let day;
        switch (d) {
            case 0:
                day = DayName.SUNDAY;
                break;
            case 1:
                day = DayName.MONDAY;
                break;
            case 2:
                day = DayName.TUESDAY;
                break;
            case 3:
                day = DayName.WEDNESDAY;
                break;
            case 4:
                day = DayName.THRUSDAY;
                break;
            case 5:
                day = DayName.FRIDAY;
                break;
            case 6:
                day = DayName.SATURDAY;
                break;
        }
        this.timeSlotService.findOneByHotelAndDay(this.hotel.id, day).subscribe(
            (res: HttpResponse<ITimeSlot>) => {
                this.timeSlots = res.body;
                this.timingService.findAllByTimeSlot(this.timeSlots.id).subscribe(
                    (res2: HttpResponse<ITiming[]>) => {
                        this.timings = res2.body;
                        this.timings.forEach(element => {
                            this.timeSlot.push(element.startTime);
                        });
                    },
                    (res2: HttpErrorResponse) => this.onError(res2.message)
                );
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
}
