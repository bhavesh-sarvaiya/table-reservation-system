import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { TimeSlot } from 'app/shared/model/time-slot.model';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotComponent } from './time-slot.component';
import { TimeSlotDetailComponent } from './time-slot-detail.component';
import { TimeSlotUpdateComponent } from './time-slot-update.component';
import { TimeSlotDeletePopupComponent } from './time-slot-delete-dialog.component';
import { ITimeSlot } from 'app/shared/model/time-slot.model';

@Injectable({ providedIn: 'root' })
export class TimeSlotResolve implements Resolve<ITimeSlot> {
    constructor(private service: TimeSlotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((timeSlot: HttpResponse<TimeSlot>) => timeSlot.body);
        }
        return Observable.of(new TimeSlot());
    }
}

export const timeSlotRoute: Routes = [
    {
        path: 'time-slot',
        component: TimeSlotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimeSlots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'time-slot/:id/view',
        component: TimeSlotDetailComponent,
        resolve: {
            timeSlot: TimeSlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimeSlots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'time-slot/new',
        component: TimeSlotUpdateComponent,
        resolve: {
            timeSlot: TimeSlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimeSlots'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'time-slot/:id/edit',
        component: TimeSlotUpdateComponent,
        resolve: {
            timeSlot: TimeSlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimeSlots'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timeSlotPopupRoute: Routes = [
    {
        path: 'time-slot/:id/delete',
        component: TimeSlotDeletePopupComponent,
        resolve: {
            timeSlot: TimeSlotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TimeSlots'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
