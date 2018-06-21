import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { HotelTable } from 'app/shared/model/hotel-table.model';
import { HotelTableService } from './hotel-table.service';
import { HotelTableComponent } from './hotel-table.component';
import { HotelTableDetailComponent } from './hotel-table-detail.component';
import { HotelTableUpdateComponent } from './hotel-table-update.component';
import { HotelTableDeletePopupComponent } from './hotel-table-delete-dialog.component';
import { IHotelTable } from 'app/shared/model/hotel-table.model';

@Injectable({ providedIn: 'root' })
export class HotelTableResolve implements Resolve<IHotelTable> {
    constructor(private service: HotelTableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((hotelTable: HttpResponse<HotelTable>) => hotelTable.body);
        }
        return Observable.of(new HotelTable());
    }
}

export const hotelTableRoute: Routes = [
    {
        path: 'hotel-table',
        component: HotelTableComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelTables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-table/:id/view',
        component: HotelTableDetailComponent,
        resolve: {
            hotelTable: HotelTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelTables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-table/new',
        component: HotelTableUpdateComponent,
        resolve: {
            hotelTable: HotelTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelTables'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-table/:id/edit',
        component: HotelTableUpdateComponent,
        resolve: {
            hotelTable: HotelTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelTables'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelTablePopupRoute: Routes = [
    {
        path: 'hotel-table/:id/delete',
        component: HotelTableDeletePopupComponent,
        resolve: {
            hotelTable: HotelTableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelTables'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
