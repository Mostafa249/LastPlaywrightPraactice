import { info } from "../utils/logger";
import { ProductsPage } from "../pages/productsPage";
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { DataReader } from "../utils/dataReader";

let loginData = DataReader.readJsonFile('./src/data/loginData.json');
let productsData = DataReader.readJsonFile('./src/data/productsData.json');

test.describe('Test products ui secnarios', () => {
    let productsPage;
    let loginPage;

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
    });
    test('Verify that listed products are six ', async () => {
        info('Assert on the products count');
        expect(await productsPage.getProductsCount()).toEqual(6);
        info('All is done !')
    });
    test('Verify that each listed product has name', async () => {
        info('Assert that products names equal the products count ');
        expect(await productsPage.getProductsNamesCounts()).toEqual(await productsPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has image', async () => {
        info('Assert that products images equal the products count ');
        expect((await productsPage.getProductsImagesCounts()) / 2).toEqual(await productsPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has discription', async () => {
        info('Assert that products discriptions equal the products count ');
        expect(await productsPage.getProductsDescCounts()).toEqual(await productsPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has price', async () => {
        info('Assert that products prices equal the products count ');
        expect(await productsPage.getProductsPricesCounts()).toEqual(await productsPage.getProductsCount());
        info('All is done !')
    });
    test('Verify that each listed product has add to cart button', async () => {
        info('Assert that products add to cart buttons equal the products count ');
        expect(await productsPage.getProductsAddToCartButtonsCounts()).toEqual(await productsPage.getProductsCount());
        info('All is done !')
    });

});
test.describe('Test add product to cart scenarios', () => {
    let productsPage;
    let loginPage;

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
    });
    test('Verify existence of shopping cart icon', async ({ page }) => {
        info("Locate shopping cart icon");
        let shoppingCartIcon = await page.locator('.shopping_cart_container');
        info("Assert that is shopping cart is displayed to user");
        expect(shoppingCartIcon).toBeVisible();
        info("All is done !");
    });
    test('Verify that shoppin cart icon marked with 2 after adding 2 products', async ({ page }) => {
        info("Add two product to cart");
        await productsPage.addTwoProductsToCart();
        info("Get the displayed number on the shopping cart icon badge");
        let shoppingCartIconCounter = await page.locator('.shopping_cart_badge').textContent();
        info("Assert that the displayed number on the shooping cart badge is 2");
        expect(shoppingCartIconCounter).toEqual('2');
        info("All is done !");
    });
    test('Verify that user can remove added products and the counter should be decreased', async ({ page }) => {
        let shoppingCartIconCounter = await page.locator('.shopping_cart_badge');
        info("Add two product to cart");
        await productsPage.addTwoProductsToCart();
        info('Remove the added products')
        await productsPage.removeTwoProductsFromCart();
        info("Assert that the added products removed and the counter disappeared from the shooping cart icon");
        expect(shoppingCartIconCounter).not.toBeVisible();
        info("All is done !");
    });

});
test.describe('Test filteration scenarios', () => {
    let productsPage;
    let loginPage;

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
    });
    test('Verify that user can filter products in descending order', async ({ page }) => {
        let activeOption = await page.locator('.active_option');
        info('Click on the filteration dropdown list and choose to filter from Z to A');
        await productsPage.clickOnItemFromDrobDownFilter(productsData.filterOptions.descending);
        info('Assert that the chosen option is the active one');
        await expect(activeOption).toHaveText(productsData.filterOptions.descending);
        info("All is done !");
    });
    test('Verify that user can filter products from low price to the high', async ({ page }) => {
        let activeOption = await page.locator('.active_option');
        info('Click on the filteration dropdown list and choose to filter from the lowest to the highst price');
        await productsPage.clickOnItemFromDrobDownFilter(productsData.filterOptions.lowPrice);
        info('Assert that the chosen option is the active one');
        await expect(activeOption).toHaveText(productsData.filterOptions.lowPrice);
        info("All is done !");
    });
    test('Verify that user can filter products from high price to the low', async ({ page }) => {
        let activeOption = await page.locator('.active_option');
        info('Click on the filteration dropdown list and choose to filter from the highst to the lowest price');
        await productsPage.clickOnItemFromDrobDownFilter(productsData.filterOptions.highPrice);
        info('Assert that the chosen option is the active one');
        await expect(activeOption).toHaveText(productsData.filterOptions.highPrice);
        info("All is done !");
    });
});