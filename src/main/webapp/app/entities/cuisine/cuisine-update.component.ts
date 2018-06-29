import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from './cuisine.service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-cuisine-update',
    templateUrl: './cuisine-update.component.html'
})
export class CuisineUpdateComponent implements OnInit {
    private _cuisine: ICuisine;
    isSaving: boolean;

    hotels: IHotel[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private cuisineService: CuisineService,
        private hotelService: HotelService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cuisine }) => {
            this.cuisine = cuisine;
        });
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.dataUtils.clearInputImage(this.cuisine, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cuisine.id !== undefined) {
            this.subscribeToSaveResponse(this.cuisineService.update(this.cuisine));
        } else {
            this.subscribeToSaveResponse(this.cuisineService.create(this.cuisine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICuisine>>) {
        result.subscribe((res: HttpResponse<ICuisine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get cuisine() {
        return this._cuisine;
    }

    set cuisine(cuisine: ICuisine) {
        this._cuisine = cuisine;
    }
}
