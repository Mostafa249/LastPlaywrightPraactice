import { info } from "../utils/logger";
import { LoginPage } from "../pages/loginPage";
import { test, expect } from "@playwright/test";
import { DataReader } from "../utils/dataReader";
import { YourCartPage } from "../pages/yourCartPage";
import { ProductsPage } from "../pages/productsPage";
import { CheckoutInfoPage } from "../pages/checkOutInfoPage";

let loginData = DataReader.readJsonFile('./src/data/loginData.json');
let checkoutData = DataReader.readJsonFile('./src/data/checkoutData.json');

test.describe('Test checkout info scenarios', () => {
    let productsPage;
    let loginPage;
    let yourCartPage;
    let checkoutInfoPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo('');
        info('Enter valid user name');
        await loginPage.enterUserName(loginData.validUserName);
        info('Enter valid password');
        await loginPage.enterPassword(loginData.validPassword);
        info('Click on login button');
        await loginPage.clickLogin();
        productsPage = new ProductsPage(page);
        info('Add two product to cart');
        await productsPage.addTwoProductsToCart();
        info('Click on shopping cart icon');
        await productsPage.clickOnShoppingCartIcon();
        yourCartPage = new YourCartPage(page);
        info('Click on checkout button');
        await yourCartPage.clickOnCheckoutButton();
        checkoutInfoPage = new CheckoutInfoPage(page);
    });
    test('Verify that  first name is mandatory', async () => {
        info('Enter last name');
        checkoutInfoPage.enterLastName(checkoutData.lastName);
        info('Enter zip code');
        checkoutInfoPage.enterZipCode(checkoutData.zipCode);
        info('Click on continue button');
        checkoutInfoPage.clickContinue();
        info('Assert on the error message for the first name');
        expect(await checkoutInfoPage.getErrorMessage()).toEqual(checkoutData.emptyFirstName);
        info('All is done !');
    });
    test('Verify that  last name is mandatory', async () => {
        info('Enter zip code');
        checkoutInfoPage.enterZipCode(checkoutData.zipCode);
        info('Enter first name');
        checkoutInfoPage.enterFirstName(checkoutData.firstName);
        info('Click on continue button');
        checkoutInfoPage.clickContinue();
        info('Assert on the error message for the first name');
        expect(await checkoutInfoPage.getErrorMessage()).toEqual(checkoutData.emptyLastName);
        info('All is done !');
    });
    test('Verify that  zip code is mandatory', async () => {
        info('Enter first name');
        checkoutInfoPage.enterFirstName(checkoutData.firstName);
        info('Enter last name');
        checkoutInfoPage.enterLastName(checkoutData.lastName);
        info('Click on continue button');
        checkoutInfoPage.clickContinue();
        info('Assert on the error message for the first name');
        expect(await checkoutInfoPage.getErrorMessage()).toEqual(checkoutData.emptyZipCode);
        info('All is done !');
    });
    test('Verify that user can cancel checkout and go back to cart screen', async ({ page }) => {
        info('Click on cancel button ');
        checkoutInfoPage.clickCancel();
        info('Assert that user return to cart page');
        expect(await page.getByText('Your Cart').textContent()).toEqual('Your Cart');
        info('All is done !');
    });
    test('Verify that user can continue checkout', async ({ page }) => {
        info('Enter first name');
        await checkoutInfoPage.enterFirstName(checkoutData.firstName);
        info('Enter last name');
        await checkoutInfoPage.enterLastName(checkoutData.lastName);
        info('Enter zip code');
        await checkoutInfoPage.enterZipCode(checkoutData.zipCode);
        info('Click on continue button');
        checkoutInfoPage.clickContinue();
        info('Assert that user can continue checkout successfully');
        expect(await page.getByText('Checkout: Overview').textContent()).
            toEqual('Checkout: Overview');
        info('All is done !');
    });

});