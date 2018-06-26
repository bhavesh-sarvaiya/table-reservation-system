import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { IStaff } from 'app/shared/model/staff.model';
import { StaffService } from 'app/entities/staff';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from 'app/entities/hotel-table';

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './table-book.component.html'
})
export class TableBookComponent implements OnInit {
    hotel: IHotel;
    staff: IStaff[];
    hotelTables: IHotelTable[];
    constructor(private dataUtils: JhiDataUtils,
        private staffService: StaffService,
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
         private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
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
}
