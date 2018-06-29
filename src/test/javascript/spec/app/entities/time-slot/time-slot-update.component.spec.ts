/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { TimeSlotUpdateComponent } from 'app/entities/time-slot/time-slot-update.component';
import { TimeSlotService } from 'app/entities/time-slot/time-slot.service';
import { TimeSlot } from 'app/shared/model/time-slot.model';

describe('Component Tests', () => {
    describe('TimeSlot Management Update Component', () => {
        let comp: TimeSlotUpdateComponent;
        let fixture: ComponentFixture<TimeSlotUpdateComponent>;
        let service: TimeSlotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimeSlotUpdateComponent]
            })
                .overrideTemplate(TimeSlotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimeSlotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeSlotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TimeSlot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timeSlot = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TimeSlot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timeSlot = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
