/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { HotelTableUpdateComponent } from 'app/entities/hotel-table/hotel-table-update.component';
import { HotelTableService } from 'app/entities/hotel-table/hotel-table.service';
import { HotelTable } from 'app/shared/model/hotel-table.model';

describe('Component Tests', () => {
    describe('HotelTable Management Update Component', () => {
        let comp: HotelTableUpdateComponent;
        let fixture: ComponentFixture<HotelTableUpdateComponent>;
        let service: HotelTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [HotelTableUpdateComponent]
            })
                .overrideTemplate(HotelTableUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelTableUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelTableService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new HotelTable(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hotelTable = entity;
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
                    const entity = new HotelTable();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.hotelTable = entity;
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
