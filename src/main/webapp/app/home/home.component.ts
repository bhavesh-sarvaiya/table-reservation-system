import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { HotelService } from 'app/entities/hotel';
import { IHotel } from 'app/shared/model/hotel.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    search: String;
    hotels: IHotel[];
    length: number;
    constructor(private principal: Principal,
        private hotelService: HotelService,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
         private loginModalService: LoginModalService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }
    searchHotel() {
        this.search = this.search.trim();
        this.hotelService
        .searchHotel(this.search)
        .subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
                this.length = this.hotels.length;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
}
