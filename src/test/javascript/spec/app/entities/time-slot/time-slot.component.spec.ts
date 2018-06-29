/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TableReservationTestModule } from '../../../test.module';
import { TimeSlotComponent } from 'app/entities/time-slot/time-slot.component';
import { TimeSlotService } from 'app/entities/time-slot/time-slot.service';
import { TimeSlot } from 'app/shared/model/time-slot.model';

describe('Component Tests', () => {
    describe('TimeSlot Management Component', () => {
        let comp: TimeSlotComponent;
        let fixture: ComponentFixture<TimeSlotComponent>;
        let service: TimeSlotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimeSlotComponent],
                providers: []
            })
                .overrideTemplate(TimeSlotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimeSlotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeSlotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TimeSlot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.timeSlots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
