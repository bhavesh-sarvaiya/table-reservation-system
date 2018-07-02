import { element, by, promise, ElementFinder } from 'protractor';

export class TimingComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-timing div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class TimingUpdatePage {
    pageTitle = element(by.id('jhi-timing-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    startTimeInput = element(by.id('field_startTime'));
    endTimeInput = element(by.id('field_endTime'));
    rushHourInput = element(by.id('field_rushHour'));
    timeSlotSelect = element(by.id('field_timeSlot'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setStartTimeInput(startTime): promise.Promise<void> {
        return this.startTimeInput.sendKeys(startTime);
    }

    getStartTimeInput() {
        return this.startTimeInput.getAttribute('value');
    }

    setEndTimeInput(endTime): promise.Promise<void> {
        return this.endTimeInput.sendKeys(endTime);
    }

    getEndTimeInput() {
        return this.endTimeInput.getAttribute('value');
    }

    getRushHourInput() {
        return this.rushHourInput;
    }
    timeSlotSelectLastOption(): promise.Promise<void> {
        return this.timeSlotSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    timeSlotSelectOption(option): promise.Promise<void> {
        return this.timeSlotSelect.sendKeys(option);
    }

    getTimeSlotSelect(): ElementFinder {
        return this.timeSlotSelect;
    }

    getTimeSlotSelectedOption() {
        return this.timeSlotSelect.element(by.css('option:checked')).getText();
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
