import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Staff } from 'app/shared/model/staff.model';
import { StaffService } from './staff.service';
import { StaffComponent } from './staff.component';
import { StaffDetailComponent } from './staff-detail.component';
import { StaffUpdateComponent } from './staff-update.component';
import { StaffDeletePopupComponent } from './staff-delete-dialog.component';
import { IStaff } from 'app/shared/model/staff.model';

@Injectable({ providedIn: 'root' })
export class StaffResolve implements Resolve<IStaff> {
    constructor(private service: StaffService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((staff: HttpResponse<Staff>) => staff.body);
        }
        return Observable.of(new Staff());
    }
}

export const staffRoute: Routes = [
    {
        path: 'staff',
        component: StaffComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Staff'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff/:id/view',
        component: StaffDetailComponent,
        resolve: {
            staff: StaffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Staff'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff/new',
        component: StaffUpdateComponent,
        resolve: {
            staff: StaffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Staff'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staff/:id/edit',
        component: StaffUpdateComponent,
        resolve: {
            staff: StaffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Staff'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const staffPopupRoute: Routes = [
    {
        path: 'staff/:id/delete',
        component: StaffDeletePopupComponent,
        resolve: {
            staff: StaffResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Staff'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
