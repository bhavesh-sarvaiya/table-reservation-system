import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICuisine } from 'app/shared/model/cuisine.model';
import { CuisineService } from './cuisine.service';

@Component({
    selector: 'jhi-cuisine-delete-dialog',
    templateUrl: './cuisine-delete-dialog.component.html'
})
export class CuisineDeleteDialogComponent {
    cuisine: ICuisine;

    constructor(private cuisineService: CuisineService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cuisineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cuisineListModification',
                content: 'Deleted an cuisine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cuisine-delete-popup',
    template: ''
})
export class CuisineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cuisine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CuisineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cuisine = cuisine;
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
