import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from './hotel-table.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-hotel-table-update',
    templateUrl: './hotel-table-update.component.html'
})
export class HotelTableUpdateComponent implements OnInit {
    private _hotelTable: IHotelTable;
    isSaving: boolean;

    hotels: IHotel[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private hotelTableService: HotelTableService,
        private hotelService: HotelService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotelTable }) => {
            this.hotelTable = hotelTable;
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
        if (this.hotelTable.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelTableService.update(this.hotelTable));
        } else {
            this.subscribeToSaveResponse(this.hotelTableService.create(this.hotelTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHotelTable>>) {
        result.subscribe((res: HttpResponse<IHotelTable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get hotelTable() {
        return this._hotelTable;
    }

    set hotelTable(hotelTable: IHotelTable) {
        this._hotelTable = hotelTable;
    }
}
