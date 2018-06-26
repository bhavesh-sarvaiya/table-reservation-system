import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BookingComponentsPage, BookingUpdatePage } from './booking.page-object';

describe('Booking e2e test', () => {
    let navBarPage: NavBarPage;
    let bookingUpdatePage: BookingUpdatePage;
    let bookingComponentsPage: BookingComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bookings', () => {
        navBarPage.goToEntity('booking');
        bookingComponentsPage = new BookingComponentsPage();
        expect(bookingComponentsPage.getTitle()).toMatch(/Bookings/);
    });

    it('should load create Booking page', () => {
        bookingComponentsPage.clickOnCreateButton();
        bookingUpdatePage = new BookingUpdatePage();
        expect(bookingUpdatePage.getPageTitle()).toMatch(/Create or edit a Booking/);
        bookingUpdatePage.cancel();
    });

    /* it('should create and save Bookings', () => {
        bookingComponentsPage.clickOnCreateButton();
        bookingUpdatePage.setBookDateInput('2000-12-31');
        expect(bookingUpdatePage.getBookDateInput()).toMatch('2000-12-31');
        bookingUpdatePage.setBookTimeInput('bookTime');
        expect(bookingUpdatePage.getBookTimeInput()).toMatch('bookTime');
        bookingUpdatePage.setNoOfGuestInput('5');
        expect(bookingUpdatePage.getNoOfGuestInput()).toMatch('5');
        bookingUpdatePage.hotelSelectLastOption();
        bookingUpdatePage.hotelTableSelectLastOption();
        bookingUpdatePage.save();
        expect(bookingUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
