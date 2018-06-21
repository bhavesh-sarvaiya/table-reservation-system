import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableReservationSharedModule } from 'app/shared';
import {
    HotelTableComponent,
    HotelTableDetailComponent,
    HotelTableUpdateComponent,
    HotelTableDeletePopupComponent,
    HotelTableDeleteDialogComponent,
    hotelTableRoute,
    hotelTablePopupRoute
} from './';

const ENTITY_STATES = [...hotelTableRoute, ...hotelTablePopupRoute];

@NgModule({
    imports: [TableReservationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HotelTableComponent,
        HotelTableDetailComponent,
        HotelTableUpdateComponent,
        HotelTableDeleteDialogComponent,
        HotelTableDeletePopupComponent
    ],
    entryComponents: [HotelTableComponent, HotelTableUpdateComponent, HotelTableDeleteDialogComponent, HotelTableDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationHotelTableModule {}
