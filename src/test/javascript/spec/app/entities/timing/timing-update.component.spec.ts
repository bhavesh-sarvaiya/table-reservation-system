/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { TimingUpdateComponent } from 'app/entities/timing/timing-update.component';
import { TimingService } from 'app/entities/timing/timing.service';
import { Timing } from 'app/shared/model/timing.model';

describe('Component Tests', () => {
    describe('Timing Management Update Component', () => {
        let comp: TimingUpdateComponent;
        let fixture: ComponentFixture<TimingUpdateComponent>;
        let service: TimingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [TimingUpdateComponent]
            })
                .overrideTemplate(TimingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Timing(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timing = entity;
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
                    const entity = new Timing();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.timing = entity;
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
