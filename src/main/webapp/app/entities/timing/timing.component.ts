import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITiming } from 'app/shared/model/timing.model';
import { Principal } from 'app/core';
import { TimingService } from './timing.service';

@Component({
    selector: 'jhi-timing',
    templateUrl: './timing.component.html'
})
export class TimingComponent implements OnInit, OnDestroy {
    timings: ITiming[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private timingService: TimingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.timingService.query().subscribe(
            (res: HttpResponse<ITiming[]>) => {
                this.timings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTimings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITiming) {
        return item.id;
    }

    registerChangeInTimings() {
        this.eventSubscriber = this.eventManager.subscribe('timingListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
