import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableReservationSharedModule } from 'app/shared';
import {
    HotelComponent,
    HotelDetailComponent,
    HotelUpdateComponent,
    HotelDeletePopupComponent,
    HotelDeleteDialogComponent,
    hotelRoute,
    TableBookComponent,
    hotelPopupRoute
} from './';

const ENTITY_STATES = [...hotelRoute, ...hotelPopupRoute];

@NgModule({
    imports: [TableReservationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HotelComponent, HotelDetailComponent, TableBookComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    entryComponents: [HotelComponent, TableBookComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationHotelModule {}
