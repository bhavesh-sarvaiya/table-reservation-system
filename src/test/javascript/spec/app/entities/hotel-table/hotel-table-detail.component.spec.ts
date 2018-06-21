/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { HotelTableDetailComponent } from 'app/entities/hotel-table/hotel-table-detail.component';
import { HotelTable } from 'app/shared/model/hotel-table.model';

describe('Component Tests', () => {
    describe('HotelTable Management Detail Component', () => {
        let comp: HotelTableDetailComponent;
        let fixture: ComponentFixture<HotelTableDetailComponent>;
        const route = ({ data: of({ hotelTable: new HotelTable(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [HotelTableDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotelTableDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelTableDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotelTable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
