import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    private userNameField = this.page.getByPlaceholder('Username');
    private passwordField = this.page.getByPlaceholder('Password');
    private loginButton = this.page.getByText('Login');
    private errorMessage = this.page.locator('//h3[@data-test="error"]');

    async enterUserName(userName: string) {
        await this.userNameField
            .fill(userName);
    }
    async enterPassword(password: string) {
        await this.passwordField
            .fill(password);
    }
    async clickLogin() {
        await this.loginButton
            .click();
    }
    async getErrorMessage() {
        return (await this.errorMessage.textContent());

    }
}