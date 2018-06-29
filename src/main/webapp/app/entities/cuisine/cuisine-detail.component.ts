import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';

@Component({
    selector: 'jhi-cuisine-detail',
    templateUrl: './cuisine-detail.component.html'
})
export class CuisineDetailComponent implements OnInit {
    cuisine: ICuisine;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuisine }) => {
            this.cuisine = cuisine;
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
}
