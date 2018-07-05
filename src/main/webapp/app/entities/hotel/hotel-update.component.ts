import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';
import { IStaff } from 'app/shared/model/staff.model';
import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { ICuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from 'app/entities/cuisine';
import { StaffService } from 'app/entities/staff';
import { HotelTableService } from 'app/entities/hotel-table';

@Component({
    selector: 'jhi-hotel-update',
    templateUrl: './hotel-update.component.html'
})
export class HotelUpdateComponent implements OnInit {
    private _hotel: IHotel;
    isSaving: boolean;
    staff: IStaff[];
    hotelTables: IHotelTable[];
    cuisines: ICuisine[];
    staffLength: number;
    tableLength: number;
    isInvalid: boolean;
    errorMessage: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private cuisineService: CuisineService,
        private staffService: StaffService,
        private hotelService: HotelService,
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
            if (hotel.id) {
                this.hotelTableService.getTablesByHotel(this.hotel.id).subscribe(
                    (res: HttpResponse<IHotelTable[]>) => {
                        this.hotelTables = res.body;
                        this.tableLength = this.hotelTables.length;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
                this.staffService.getStaffByHotel(this.hotel.id).subscribe(
                    (res: HttpResponse<IStaff[]>) => {
                        this.staff = res.body;
                        this.staffLength = this.staff.length;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
                this.cuisineService.getCuisineByHotel(this.hotel.id).subscribe(
                    (res: HttpResponse<ICuisine[]>) => {
                        this.cuisines = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.hotel, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.checkValidation(this._hotel);
        if (!this.isInvalid) {
            this.isSaving = true;
            if (this.hotel.id !== undefined) {
                this.subscribeToSaveResponse(this.hotelService.update(this.hotel));
            } else {
                this.subscribeToSaveResponse(this.hotelService.create(this.hotel));
            }
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHotel>>) {
        result.subscribe((res: HttpResponse<IHotel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get hotel() {
        return this._hotel;
    }

    set hotel(hotel: IHotel) {
        this._hotel = hotel;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    checkValidation(element1) {
        this.isInvalid = false;
        const stime = element1.openTime;
        const etime = element1.closeTime;
        if (!stime) {
            this.errorMessage = 'Open time is undefined';
            this.isInvalid = true;
        } else if (!etime) {
            this.errorMessage = 'Close time is undefined';
            this.isInvalid = true;
        } else {
            if (stime === etime) {
                this.errorMessage = 'Open time and Close time must be different ';
                this.isInvalid = true;
            } else {
                const shour = stime.split(':');
                const ehour = etime.split(':');
                if (shour[0] === ehour[0]) {
                    if (parseInt(shour[1], 0) >= parseInt(ehour[1], 0)) {
                        this.errorMessage = 'Open time must be less than the Close time';
                        this.isInvalid = true;
                    }
                } else {
                    if (parseInt(shour[0], 0) > parseInt(ehour[0], 0)) {
                        this.errorMessage = 'Open time must be less than the Close time';
                        this.isInvalid = true;
                    }
                }
            }
        }
    }
}
