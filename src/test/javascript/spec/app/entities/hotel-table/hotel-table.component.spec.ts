/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TableReservationTestModule } from '../../../test.module';
import { HotelTableComponent } from 'app/entities/hotel-table/hotel-table.component';
import { HotelTableService } from 'app/entities/hotel-table/hotel-table.service';
import { HotelTable } from 'app/shared/model/hotel-table.model';

describe('Component Tests', () => {
    describe('HotelTable Management Component', () => {
        let comp: HotelTableComponent;
        let fixture: ComponentFixture<HotelTableComponent>;
        let service: HotelTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [HotelTableComponent],
                providers: []
            })
                .overrideTemplate(HotelTableComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelTableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelTableService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HotelTable(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotelTables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
