import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { CuisineService } from './cuisine.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-cuisine',
    templateUrl: './cuisine.component.html'
})
export class CuisineComponent implements OnInit, OnDestroy {
    cuisines: ICuisine[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    hotels: IHotel[];
    hotel: number;
    constructor(
        private cuisineService: CuisineService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private hotelService: HotelService,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.cuisines = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.cuisineService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ICuisine[]>) => this.paginateCuisines(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            this.getHotels();
    }

    reset() {
        this.page = 0;
        this.cuisines = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCuisines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICuisine) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInCuisines() {
        this.eventSubscriber = this.eventManager.subscribe('cuisineListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateCuisines(data: ICuisine[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.cuisines.push(data[i]);
        }
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
    this.cuisines = [];
    if (this.hotel === 1) {
        this.cuisineService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<ICuisine[]>) => this.paginateCuisines(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    } else {
        this.cuisineService
            .getCuisineByHotelPage({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }, this.hotel)
            .subscribe(
                (res: HttpResponse<ICuisine[]>) => this.paginateCuisines(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
}
}
}
