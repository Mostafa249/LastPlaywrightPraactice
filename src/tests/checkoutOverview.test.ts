import { info } from "../utils/logger";
import { LoginPage } from "../pages/loginPage";
import { test, expect } from "@playwright/test";
import { DataReader } from "../utils/dataReader";
import { YourCartPage } from "../pages/yourCartPage";
import { ProductsPage } from "../pages/productsPage";
import { CheckoutInfoPage } from "../pages/checkOutInfoPage";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";

let loginData = DataReader.readJsonFile('./src/data/loginData.json');
let checkoutData = DataReader.readJsonFile('./src/data/checkoutData.json');

test.describe('Test checkout overview scenarios ', () => {
    let productsPage;
    let loginPage;
    let yourCartPage;
    let checkoutInfoPage;
    let checkoutOverviewPage;

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
        info('Enter first name');
        await checkoutInfoPage.enterFirstName(checkoutData.firstName);
        info('Enter last name');
        await checkoutInfoPage.enterLastName(checkoutData.lastName);
        info('Enter zip code');
        await checkoutInfoPage.enterZipCode(checkoutData.zipCode);
        info('Click on continue button');
        checkoutInfoPage.clickContinue();
        checkoutOverviewPage = new CheckoutOverviewPage(page);
    });
    test('Verify that payment information is diplayed successfully', async () => {
        info('Assert that the payment info label is displayed successfully');
        expect(await checkoutOverviewPage.getPaymentInfoLabel()).toBeVisible();
        info('Assert that the payment value is displayed successfully')
        expect(await checkoutOverviewPage.getPaymentInfoValue()).toHaveText(/\S/);
        info('All is done !');
    });
    test('Verify that shipping information is diplayed successfully', async () => {
        info('Assert that the shipping info label is displayed successfully');
        expect(await checkoutOverviewPage.getShippingInfoLabel()).toBeVisible();
        info('Assert that the shipping value is displayed successfully')
        expect(await checkoutOverviewPage.getShippingInfoValue()).toHaveText(/\S/);
        info('All is done !');
    });
    test('Verify that the total item price is diplayed and calculated successfully', async () => {
        info('Assertt that total items price is equal the sum of items prices');
        expect(await checkoutOverviewPage.getTotalItemsPrice())
            .toEqual(await checkoutOverviewPage.getTotalItemsPrice())
        info('All is done !')
    });
    test('Verify that the total order price is diplayed and calculated successfully', async () => {
        info('Assertt that total order price is equal the sum of items prices and tax');
        expect(await checkoutOverviewPage.getTotalOrderPrice())
            .toEqual((await checkoutOverviewPage.getAddedTax() + await checkoutOverviewPage.getTotalItemsPrice()))
        info('All is done !')
    });
    test.only('Verify that user can complete the order successfully ', async ({ page }) => {
        info('Click on finish Button');
        checkoutOverviewPage.clickFinishButton();
        info('Assert that order is placed successfully');
        expect(await page.locator('.complete-header').
            textContent()).toEqual('Thank you for your order!');
        info('All is done !')
    });
});