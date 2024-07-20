import { info } from "../utils/logger";
import { LoginPage } from "../pages/loginPage";
import { test, expect } from "@playwright/test";
import { DataReader } from "../utils/dataReader";

test.describe('Test login scenarios', () => {
    let loginPage: LoginPage;
    const data = DataReader.readJsonFile("./src/data/loginData.json");
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo('');
    });
    test('Very that user can not login without password', async () => {
        info('Enter invalid user name');
        await loginPage.enterUserName(data.invalidUserName);
        info('Click on login button');
        await loginPage.clickLogin();
        info('Assert on the returned error message');
        expect(await loginPage.getErrorMessage()).toContain(data.emptyPasswordMessage);
        info('All is Done!');
    });
    test('Very that user can not login without user name', async () => {
        info('Enter invalid password');
        await loginPage.enterPassword(data.invalidPassword);
        info('Click on login button');
        await loginPage.clickLogin();
        info('Assert on the returned error message');
        expect(await loginPage.getErrorMessage()).toContain(data.emptyUserNameMessage);
        info('All is Done!');
    });
    test('Very that user can not login with invalid credentials', async () => {
        info('Enter invalid user name');
        await loginPage.enterUserName(data.invalidUserName);
        info('Enter invalid password');
        await loginPage.enterPassword(data.invalidPassword);
        info('Click on login button');
        await loginPage.clickLogin();
        info('Assert on the returned error message');
        expect(await loginPage.getErrorMessage()).toContain(data.invalidCredsMessage);
        info('All is Done!');
    });
    test('Very that user can login successfully  with valid credentials', async ({ page }) => {
        info('Enter valid user name');
        await loginPage.enterUserName(data.validUserName);
        info('Enter valid password');
        await loginPage.enterPassword(data.validPassword);
        info('Click on login button');
        await loginPage.clickLogin();
        info('Assert that user is redirected to swas lab home page');
        expect(await page.getByText('Products')).toBeVisible();
        info('All is Done!');
    });
    test.afterEach(async ({ page }) => {
        page.close();
    });
});