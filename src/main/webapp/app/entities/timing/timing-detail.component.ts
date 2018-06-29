import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITiming } from 'app/shared/model/timing.model';

@Component({
    selector: 'jhi-timing-detail',
    templateUrl: './timing-detail.component.html'
})
export class TimingDetailComponent implements OnInit {
    timing: ITiming;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timing }) => {
            this.timing = timing;
        });
    }

    previousState() {
        window.history.back();
    }
}
