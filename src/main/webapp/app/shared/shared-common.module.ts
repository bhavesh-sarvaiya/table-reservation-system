import { NgModule } from '@angular/core';

import { TableReservationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TableReservationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TableReservationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TableReservationSharedCommonModule {}
