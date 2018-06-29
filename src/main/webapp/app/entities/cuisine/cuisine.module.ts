import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableReservationSharedModule } from 'app/shared';
import {
    CuisineComponent,
    CuisineDetailComponent,
    CuisineUpdateComponent,
    CuisineDeletePopupComponent,
    CuisineDeleteDialogComponent,
    cuisineRoute,
    cuisinePopupRoute
} from './';

const ENTITY_STATES = [...cuisineRoute, ...cuisinePopupRoute];

@NgModule({
    imports: [TableReservationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CuisineComponent,
        CuisineDetailComponent,
        CuisineUpdateComponent,
        CuisineDeleteDialogComponent,
        CuisineDeletePopupComponent
    ],
    entryComponents: [CuisineComponent, CuisineUpdateComponent, CuisineDeleteDialogComponent, CuisineDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationCuisineModule {}
