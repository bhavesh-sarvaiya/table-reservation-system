import { element, by, promise, ElementFinder } from 'protractor';

export class BookingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-booking div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class BookingUpdatePage {
    pageTitle = element(by.id('jhi-booking-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bookDateInput = element(by.id('field_bookDate'));
    bookTimeInput = element(by.id('field_bookTime'));
    noOfGuestInput = element(by.id('field_noOfGuest'));
    activeInput = element(by.id('field_active'));
    hotelSelect = element(by.id('field_hotel'));
    hotelTableSelect = element(by.id('field_hotelTable'));
    userSelect = element(by.id('field_user'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setBookDateInput(bookDate): promise.Promise<void> {
        return this.bookDateInput.sendKeys(bookDate);
    }

    getBookDateInput() {
        return this.bookDateInput.getAttribute('value');
    }

    setBookTimeInput(bookTime): promise.Promise<void> {
        return this.bookTimeInput.sendKeys(bookTime);
    }

    getBookTimeInput() {
        return this.bookTimeInput.getAttribute('value');
    }

    setNoOfGuestInput(noOfGuest): promise.Promise<void> {
        return this.noOfGuestInput.sendKeys(noOfGuest);
    }

    getNoOfGuestInput() {
        return this.noOfGuestInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }
    hotelSelectLastOption(): promise.Promise<void> {
        return this.hotelSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    hotelSelectOption(option): promise.Promise<void> {
        return this.hotelSelect.sendKeys(option);
    }

    getHotelSelect(): ElementFinder {
        return this.hotelSelect;
    }

    getHotelSelectedOption() {
        return this.hotelSelect.element(by.css('option:checked')).getText();
    }

    hotelTableSelectLastOption(): promise.Promise<void> {
        return this.hotelTableSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    hotelTableSelectOption(option): promise.Promise<void> {
        return this.hotelTableSelect.sendKeys(option);
    }

    getHotelTableSelect(): ElementFinder {
        return this.hotelTableSelect;
    }

    getHotelTableSelectedOption() {
        return this.hotelTableSelect.element(by.css('option:checked')).getText();
    }

    userSelectLastOption(): promise.Promise<void> {
        return this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    userSelectOption(option): promise.Promise<void> {
        return this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
