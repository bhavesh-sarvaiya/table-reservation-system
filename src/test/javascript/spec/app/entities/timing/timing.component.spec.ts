/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TableReservationTestModule } from '../../../test.module';
import { TimingComponent } from 'app/entities/timing/timing.component';
import { TimingService } from 'app/entities/timing/timing.service';
import { Timing } from 'app/shared/model/timing.model';

describe('Component Tests', () => {
    describe('Timing Management Component', () => {
        let comp: TimingComponent;
        let fixture: ComponentFixture<TimingComponent>;
        let service: TimingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimingComponent],
                providers: []
            })
                .overrideTemplate(TimingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Timing(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.timings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
