/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { TimingDetailComponent } from 'app/entities/timing/timing-detail.component';
import { Timing } from 'app/shared/model/timing.model';

describe('Component Tests', () => {
    describe('Timing Management Detail Component', () => {
        let comp: TimingDetailComponent;
        let fixture: ComponentFixture<TimingDetailComponent>;
        const route = ({ data: of({ timing: new Timing(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TimingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.timing).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
