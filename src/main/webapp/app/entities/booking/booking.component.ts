import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IBooking } from 'app/shared/model/booking.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { BookingService } from './booking.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-booking',
    templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit, OnDestroy {
    bookings: IBooking[];
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
        private bookingService: BookingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private hotelService: HotelService,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.bookings = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.bookingService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IBooking[]>) => this.paginateBookings(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            this.getHotels();
        }

    reset() {
        this.page = 0;
        this.bookings = [];
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
        this.registerChangeInBookings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBooking) {
        return item.id;
    }

    registerChangeInBookings() {
        this.eventSubscriber = this.eventManager.subscribe('bookingListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateBookings(data: IBooking[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.bookings.push(data[i]);
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
    this.bookings = [];
    if (this.hotel === 1) {
        this.bookingService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IBooking[]>) => this.paginateBookings(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    } else {
        this.bookingService
            .getBookingByHotel({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            }, this.hotel)
            .subscribe(
                (res: HttpResponse<IBooking[]>) => this.paginateBookings(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
}
}
}
