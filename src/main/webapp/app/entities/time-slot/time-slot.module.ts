import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableReservationSharedModule } from 'app/shared';
import {
    TimeSlotComponent,
    TimeSlotDetailComponent,
    TimeSlotUpdateComponent,
    TimeSlotDeletePopupComponent,
    TimeSlotDeleteDialogComponent,
    timeSlotRoute,
    timeSlotPopupRoute
} from './';

const ENTITY_STATES = [...timeSlotRoute, ...timeSlotPopupRoute];

@NgModule({
    imports: [TableReservationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TimeSlotComponent,
        TimeSlotDetailComponent,
        TimeSlotUpdateComponent,
        TimeSlotDeleteDialogComponent,
        TimeSlotDeletePopupComponent
    ],
    entryComponents: [TimeSlotComponent, TimeSlotUpdateComponent, TimeSlotDeleteDialogComponent, TimeSlotDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationTimeSlotModule {}
