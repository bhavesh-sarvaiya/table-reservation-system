import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotelTable } from 'app/shared/model/hotel-table.model';

@Component({
    selector: 'jhi-hotel-table-detail',
    templateUrl: './hotel-table-detail.component.html'
})
export class HotelTableDetailComponent implements OnInit {
    hotelTable: IHotelTable;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelTable }) => {
            this.hotelTable = hotelTable;
        });
    }

    previousState() {
        window.history.back();
    }
}
