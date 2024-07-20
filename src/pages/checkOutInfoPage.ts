import { BasePage } from "./basePage";

export class CheckoutInfoPage extends BasePage {
    private firstNameField = this.page.getByPlaceholder('First Name');
    private lastNameField = this.page.getByPlaceholder('Last Name');
    private zipCodeField = this.page.getByPlaceholder('Zip/Postal Code');
    private continueButton = this.page.locator('#continue');
    private cancelButton = this.page.locator('#cancel');
    private errorMessage = this.page.locator('//h3[@data-test="error"]');

    async enterFirstName(firstName: string) {
        await this.firstNameField
            .fill(firstName);
    }
    async enterLastName(lastName: string) {
        await this.lastNameField
            .fill(lastName);
    }
    async enterZipCode(zipCode: string) {
        await this.zipCodeField
            .fill(zipCode);
    }
    async clickContinue() {
        await this.continueButton
            .click();
    }
    async clickCancel() {
        await this.cancelButton
            .click();
    }
    async getErrorMessage() {
        return (await this.errorMessage.textContent());

    }
}