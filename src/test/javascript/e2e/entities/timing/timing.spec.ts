import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TimingComponentsPage, TimingUpdatePage } from './timing.page-object';

describe('Timing e2e test', () => {
    let navBarPage: NavBarPage;
    let timingUpdatePage: TimingUpdatePage;
    let timingComponentsPage: TimingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Timings', () => {
        navBarPage.goToEntity('timing');
        timingComponentsPage = new TimingComponentsPage();
        expect(timingComponentsPage.getTitle()).toMatch(/Timings/);
    });

    it('should load create Timing page', () => {
        timingComponentsPage.clickOnCreateButton();
        timingUpdatePage = new TimingUpdatePage();
        expect(timingUpdatePage.getPageTitle()).toMatch(/Create or edit a Timing/);
        timingUpdatePage.cancel();
    });

    /* it('should create and save Timings', () => {
        timingComponentsPage.clickOnCreateButton();
        timingUpdatePage.setStartTimeInput('startTime');
        expect(timingUpdatePage.getStartTimeInput()).toMatch('startTime');
        timingUpdatePage.setEndTimeInput('endTime');
        expect(timingUpdatePage.getEndTimeInput()).toMatch('endTime');
        timingUpdatePage.getRushHourInput().isSelected().then((selected) => {
            if (selected) {
                timingUpdatePage.getRushHourInput().click();
                expect(timingUpdatePage.getRushHourInput().isSelected()).toBeFalsy();
            } else {
                timingUpdatePage.getRushHourInput().click();
                expect(timingUpdatePage.getRushHourInput().isSelected()).toBeTruthy();
            }
        });
        timingUpdatePage.timeSlotSelectLastOption();
        timingUpdatePage.save();
        expect(timingUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
