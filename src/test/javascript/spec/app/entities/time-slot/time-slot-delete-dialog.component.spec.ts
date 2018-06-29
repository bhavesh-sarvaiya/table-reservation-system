/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TableReservationTestModule } from '../../../test.module';
import { TimeSlotDeleteDialogComponent } from 'app/entities/time-slot/time-slot-delete-dialog.component';
import { TimeSlotService } from 'app/entities/time-slot/time-slot.service';

describe('Component Tests', () => {
    describe('TimeSlot Management Delete Component', () => {
        let comp: TimeSlotDeleteDialogComponent;
        let fixture: ComponentFixture<TimeSlotDeleteDialogComponent>;
        let service: TimeSlotService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimeSlotDeleteDialogComponent]
            })
                .overrideTemplate(TimeSlotDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimeSlotDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeSlotService);
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
