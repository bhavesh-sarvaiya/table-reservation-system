/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TableReservationTestModule } from '../../../test.module';
import { CuisineDeleteDialogComponent } from 'app/entities/cuisine/cuisine-delete-dialog.component';
import { CuisineService } from 'app/entities/cuisine/cuisine.service';

describe('Component Tests', () => {
    describe('Cuisine Management Delete Component', () => {
        let comp: CuisineDeleteDialogComponent;
        let fixture: ComponentFixture<CuisineDeleteDialogComponent>;
        let service: CuisineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [CuisineDeleteDialogComponent]
            })
                .overrideTemplate(CuisineDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CuisineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuisineService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
