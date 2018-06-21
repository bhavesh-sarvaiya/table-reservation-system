import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStaff } from 'app/shared/model/staff.model';

@Component({
    selector: 'jhi-staff-detail',
    templateUrl: './staff-detail.component.html'
})
export class StaffDetailComponent implements OnInit {
    staff: IStaff;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ staff }) => {
            this.staff = staff;
        });
    }

    previousState() {
        window.history.back();
    }
}
