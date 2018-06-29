/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { CuisineUpdateComponent } from 'app/entities/cuisine/cuisine-update.component';
import { CuisineService } from 'app/entities/cuisine/cuisine.service';
import { Cuisine } from 'app/shared/model/cuisine.model';

describe('Component Tests', () => {
    describe('Cuisine Management Update Component', () => {
        let comp: CuisineUpdateComponent;
        let fixture: ComponentFixture<CuisineUpdateComponent>;
        let service: CuisineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [CuisineUpdateComponent]
            })
                .overrideTemplate(CuisineUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CuisineUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuisineService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Cuisine(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cuisine = entity;
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
                    const entity = new Cuisine();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cuisine = entity;
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
