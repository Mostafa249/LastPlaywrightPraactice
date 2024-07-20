import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { DataReader } from "../utils/dataReader";
import { info } from "../utils/logger";
import { YourCartPage } from "../pages/yourCartPage";
import { ProductsPage } from "../pages/productsPage";

let loginData = DataReader.readJsonFile('./src/data/loginData.json');

test.describe('Test Your cart scenarios', () => {
    let productsPage;
    let loginPage;
    let yourCartPage;

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
    });

    test('Verify that added prdoucts are displayed in your cart screen', async () => {
        info('Assert that the 2 added products are displayed in your cart screen');
        expect(await yourCartPage.getProductsCount()).
            toEqual(Number(await yourCartPage.getShopppingCartIconText()));
        info('All is done! ');
    });
    test('Verify that listed products are 2 ', async () => {
        info('Assert on the products count');
        expect(await yourCartPage.getProductsCount()).
            toEqual(Number(await yourCartPage.getShopppingCartIconText()));
        info('All is done !')
    });
    test('Verify that each listed product has name', async () => {
        info('Assert that products names equal the products count ');
        expect(await yourCartPage.getProductsNamesCounts()).
            toEqual(await yourCartPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has discription', async () => {
        info('Assert that products discriptions equal the products count ');
        expect(await yourCartPage.getProductsDescCounts()).
            toEqual(await yourCartPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has price', async () => {
        info('Assert that products prices equal the products count ');
        expect(await yourCartPage.getProductsPricesCounts()).
            toEqual(await yourCartPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has remove from cart button', async () => {
        info('Assert that products remove from cart buttons equal the products count ');
        expect(await yourCartPage.getProductsRemoveFromCartButtonsCounts()).
            toEqual(await yourCartPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that user can remove any product from cart', async () => {
        info('Remove product from cart');
        yourCartPage.removeProductFromCart();
        info('Assert that product removed successfully');
        expect(await await yourCartPage.getProductsCount()).
            toEqual(Number(await yourCartPage.getShopppingCartIconText()));
        info('All is done! ');
    });
    test('Verify that user can back to products screen to continue shopping', async ({ page }) => {
        info('Click on continue shopping button');
        yourCartPage.clickOnContinueShoppingButton();
        info('Assert that user returned to products screen successfully');
        expect(await page.getByText('Products')).toBeVisible();
        info('All is Done!');
    });
});
