/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TableReservationTestModule } from '../../../test.module';
import { CuisineDetailComponent } from 'app/entities/cuisine/cuisine-detail.component';
import { Cuisine } from 'app/shared/model/cuisine.model';

describe('Component Tests', () => {
    describe('Cuisine Management Detail Component', () => {
        let comp: CuisineDetailComponent;
        let fixture: ComponentFixture<CuisineDetailComponent>;
        const route = ({ data: of({ cuisine: new Cuisine(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TableReservationTestModule],
                declarations: [CuisineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CuisineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CuisineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cuisine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
