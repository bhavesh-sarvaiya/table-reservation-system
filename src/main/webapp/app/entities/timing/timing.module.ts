import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableReservationSharedModule } from 'app/shared';
import {
    TimingComponent,
    TimingDetailComponent,
    TimingUpdateComponent,
    TimingDeletePopupComponent,
    TimingDeleteDialogComponent,
    timingRoute,
    timingPopupRoute
} from './';

const ENTITY_STATES = [...timingRoute, ...timingPopupRoute];

@NgModule({
    imports: [TableReservationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TimingComponent, TimingDetailComponent, TimingUpdateComponent, TimingDeleteDialogComponent, TimingDeletePopupComponent],
    entryComponents: [TimingComponent, TimingUpdateComponent, TimingDeleteDialogComponent, TimingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableReservationTimingModule {}
