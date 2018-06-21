import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from './hotel-table.service';

@Component({
    selector: 'jhi-hotel-table-delete-dialog',
    templateUrl: './hotel-table-delete-dialog.component.html'
})
export class HotelTableDeleteDialogComponent {
    hotelTable: IHotelTable;

    constructor(private hotelTableService: HotelTableService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotelTableService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotelTableListModification',
                content: 'Deleted an hotelTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotel-table-delete-popup',
    template: ''
})
export class HotelTableDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelTable }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotelTableDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.hotelTable = hotelTable;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
