import { element, by, promise, ElementFinder } from 'protractor';

export class HotelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-hotel div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class HotelUpdatePage {
    pageTitle = element(by.id('jhi-hotel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    imageInput = element(by.id('file_image'));
    nameInput = element(by.id('field_name'));
    typeInput = element(by.id('field_type'));
    openTimeInput = element(by.id('field_openTime'));
    closeTimeInput = element(by.id('field_closeTime'));
    cityInput = element(by.id('field_city'));
    addressInput = element(by.id('field_address'));
    pincodeInput = element(by.id('field_pincode'));
    descriptionInput = element(by.id('field_description'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setImageInput(image): promise.Promise<void> {
        return this.imageInput.sendKeys(image);
    }

    getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setTypeInput(type): promise.Promise<void> {
        return this.typeInput.sendKeys(type);
    }

    getTypeInput() {
        return this.typeInput.getAttribute('value');
    }

    setOpenTimeInput(openTime): promise.Promise<void> {
        return this.openTimeInput.sendKeys(openTime);
    }

    getOpenTimeInput() {
        return this.openTimeInput.getAttribute('value');
    }

    setCloseTimeInput(closeTime): promise.Promise<void> {
        return this.closeTimeInput.sendKeys(closeTime);
    }

    getCloseTimeInput() {
        return this.closeTimeInput.getAttribute('value');
    }

    setCityInput(city): promise.Promise<void> {
        return this.cityInput.sendKeys(city);
    }

    getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    setAddressInput(address): promise.Promise<void> {
        return this.addressInput.sendKeys(address);
    }

    getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    setPincodeInput(pincode): promise.Promise<void> {
        return this.pincodeInput.sendKeys(pincode);
    }

    getPincodeInput() {
        return this.pincodeInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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
