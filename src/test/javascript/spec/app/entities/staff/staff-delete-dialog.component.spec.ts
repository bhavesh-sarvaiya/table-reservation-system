/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TableReservationTestModule } from '../../../test.module';
import { StaffDeleteDialogComponent } from 'app/entities/staff/staff-delete-dialog.component';
import { StaffService } from 'app/entities/staff/staff.service';

describe('Component Tests', () => {
    describe('Staff Management Delete Component', () => {
        let comp: StaffDeleteDialogComponent;
        let fixture: ComponentFixture<StaffDeleteDialogComponent>;
        let service: StaffService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [StaffDeleteDialogComponent]
            })
                .overrideTemplate(StaffDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StaffDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StaffService);
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
