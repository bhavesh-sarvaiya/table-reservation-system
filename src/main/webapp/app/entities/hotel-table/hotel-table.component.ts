import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { Principal } from 'app/core';
import { HotelTableService } from './hotel-table.service';

@Component({
    selector: 'jhi-hotel-table',
    templateUrl: './hotel-table.component.html'
})
export class HotelTableComponent implements OnInit, OnDestroy {
    hotelTables: IHotelTable[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private hotelTableService: HotelTableService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.hotelTableService.query().subscribe(
            (res: HttpResponse<IHotelTable[]>) => {
                this.hotelTables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHotelTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHotelTable) {
        return item.id;
    }

    registerChangeInHotelTables() {
        this.eventSubscriber = this.eventManager.subscribe('hotelTableListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
