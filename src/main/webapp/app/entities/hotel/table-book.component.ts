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
import { getLocaleDayNames, DatePipe } from '@angular/common';
import * as _ from 'underscore';
import { LoginModalService } from 'app/core';
// import { ModalService } from 'app/entities/hotel/modal.service';

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
    tableLength: boolean;
    currentDate: string;
    maxDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private timingService: TimingService,
        private staffService: StaffService,
        private timeSlotService: TimeSlotService,
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
        private bookingService: BookingService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        const now = new  Date();
        this.currentDate = new DatePipe('en-US').transform(now, 'yyyy-MM-dd');
        now.setDate(now.getDate() + 7);
        this.maxDate = new DatePipe('en-US').transform(now, 'yyyy-MM-dd');
        this.activatedRoute.data.subscribe(({ booking }) => {
            this.booking = new Booking();
        });
        this.timeSlot = [];
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
            this.getHotelTable();
            // this.hotelTableService.getTablesByHotelAndStatus(this.hotel.id, 'Available').subscribe(
            //     (res: HttpResponse<IHotelTable[]>) => {
            //         this.availableHotelTables = res.body;
            //         if (this.availableHotelTables.length === 0) {
            //             this.availableHotelTables = undefined;
            //         }
            //     },
            //     (res: HttpErrorResponse) => this.onError(res.message)
            // );
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
        window.alert('Booking successfully.');
        // this._booking  = new Booking();
        // this.openModal('custom-modal-1');
       window.location.reload();
        // this.success = true;
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
        const day = this.getDay();
        this.timeSlot = [];
        this.timeSlotService.findOneByHotelAndDay(this.hotel.id, day).subscribe(
            (res: HttpResponse<ITimeSlot>) => {
                this.timeSlots = res.body;
                this.timingService.findAllByTimeSlot(this.timeSlots.id).subscribe(
                    (res2: HttpResponse<ITiming[]>) => {
                        this.timings = res2.body;
                        this.timings.forEach(element => {
                            const currTime = new Date().getTime();
                            const time = new Date(this._booking.bookDate._i + ' ' + element.startTime).getTime();
                            if (time - currTime >= 0) {
                                this.timeSlot.push(element.startTime);
                            }
                        });
                    },
                    (res2: HttpErrorResponse) => this.onError(res2.message)
                );
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.getHotelTable();
    }
    private getHotelTable() {
        let d;
        if (this._booking.bookDate) {
            d = this._booking.bookDate._i;
        } else {
            d = null;
        }
        let time;
        if (!this._booking.bookTime) {
            time = 'null';
        } else {
            time = this._booking.bookTime;
        }
        this.hotelTableService.findAllByHotelAndStatusBasedOnStaff(this.hotel.id, 'Available', d, time).subscribe(
            (res: HttpResponse<IHotelTable[]>) => {
                this.hotelTables = res.body;
                if (this.hotelTables == null) {
                    this.tableLength = false;
                } else {
                    this.tableLength = true;
                }
                if (!this.tableLength) {
                    this.hotelTables = undefined;
                }
                this.setTableForSelect();
                console.log(this.hotelTables);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getDay() {
        let d;
        if (this._booking.bookDate) {
            d = new Date(this._booking.bookDate._i).getDay();
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
        return day;
    }
    setTableForSelect() {
        this.availableHotelTables = [];
        if (this.hotelTables) {
            this.hotelTables.forEach(element => {
                if (element.status === 'Available') {
                    this.availableHotelTables.push(element);
                }
            });
        }
    }

    // openModal(id: string) {
    //     this.modalService.open(id);
    // }

    // closeModal(id: string) {
    //     this.modalService.close(id);
    // }
}
