import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { HotelService } from 'app/entities/hotel';
import { IHotel } from 'app/shared/model/hotel.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {jQuery} from 'jquery';
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
        if (this.search !== '') {
            this.hotelService
                .searchHotel(this.search)
                .subscribe(
                    (res: HttpResponse<IHotel[]>) => {
                        this.hotels = res.body;
                        this.length = this.hotels.length;
                       /* const temp = [];
                        this.hotels.forEach(function(ele) {
                            temp.push(ele.id);
                        });
                        const result = [];
                        const seen = new Set();
                        outer:
                        for (let index = 0; index < this.length; index++) {
                          const value = temp[index];
                          if (seen.has(value)) { continue outer; }
                          seen.add(value);
                          result.push(this.hotels[index]);
                        }
                        result.forEach(function(ele) {
                            console.log(ele);
                        });
                        this.hotels = result;*/
                    },
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.hotels = [];
        }
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
    getUnique(inputArray) {
        const outputArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            if ((jQuery.inArray(inputArray[i], outputArray)) === -1) {
                outputArray.push(inputArray[i]);
            }
        }
        return outputArray;
    }
}
