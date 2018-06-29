/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { TimeSlotDetailComponent } from 'app/entities/time-slot/time-slot-detail.component';
import { TimeSlot } from 'app/shared/model/time-slot.model';

describe('Component Tests', () => {
    describe('TimeSlot Management Detail Component', () => {
        let comp: TimeSlotDetailComponent;
        let fixture: ComponentFixture<TimeSlotDetailComponent>;
        const route = ({ data: of({ timeSlot: new TimeSlot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimeSlotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TimeSlotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimeSlotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.timeSlot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
