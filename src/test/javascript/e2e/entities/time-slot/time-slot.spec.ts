import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TimeSlotComponentsPage, TimeSlotUpdatePage } from './time-slot.page-object';

describe('TimeSlot e2e test', () => {
    let navBarPage: NavBarPage;
    let timeSlotUpdatePage: TimeSlotUpdatePage;
    let timeSlotComponentsPage: TimeSlotComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TimeSlots', () => {
        navBarPage.goToEntity('time-slot');
        timeSlotComponentsPage = new TimeSlotComponentsPage();
        expect(timeSlotComponentsPage.getTitle()).toMatch(/Time Slots/);
    });

    it('should load create TimeSlot page', () => {
        timeSlotComponentsPage.clickOnCreateButton();
        timeSlotUpdatePage = new TimeSlotUpdatePage();
        expect(timeSlotUpdatePage.getPageTitle()).toMatch(/Create or edit a Time Slot/);
        timeSlotUpdatePage.cancel();
    });

    /* it('should create and save TimeSlots', () => {
        timeSlotComponentsPage.clickOnCreateButton();
        timeSlotUpdatePage.daySelectLastOption();
        timeSlotUpdatePage.getStatusInput().isSelected().then((selected) => {
            if (selected) {
                timeSlotUpdatePage.getStatusInput().click();
                expect(timeSlotUpdatePage.getStatusInput().isSelected()).toBeFalsy();
            } else {
                timeSlotUpdatePage.getStatusInput().click();
                expect(timeSlotUpdatePage.getStatusInput().isSelected()).toBeTruthy();
            }
        });
        timeSlotUpdatePage.hotelSelectLastOption();
        timeSlotUpdatePage.save();
        expect(timeSlotUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
