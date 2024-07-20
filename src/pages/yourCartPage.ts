import { BasePage } from "./basePage";

export class YourCartPage extends BasePage {
    private listOfProducts = this.page.locator('.cart_item');
    private productName = this.page.locator('.inventory_item_name ');
    private productDesc = this.page.locator('.inventory_item_desc');
    private productPrice = this.page.locator('.inventory_item_price');
    private productQty = this.page.locator('.cart_quantity');
    private shoppingCartIcon = this.page.locator('.shopping_cart_badge')
    private productRemoveFromCartButton = this.page.getByText('Remove');
    private boltTShirtRemoveFromCartButton = this.page.locator('#remove-sauce-labs-bolt-t-shirt');
    private continueShoppingButton = this.page.locator('#continue-shopping');
    private checkOutButton = this.page.locator('#checkout');

    async getProductsCount() {
        const productsCount = await this.listOfProducts.count();
        return productsCount;
    }
    async getProductsNamesCounts() {
        const productsNamesCount = await this.productName.count();
        return productsNamesCount;
    }
    async getProductsDescCounts() {
        const productsDescCount = await this.productDesc.count();
        return productsDescCount;
    }
    async getProductsPricesCounts() {
        const productsPricesCount = await this.productPrice.count();
        return productsPricesCount;
    }
    async getProductsQtyCounts() {
        const productsQtyCount = await this.productQty.count();
        return productsQtyCount;
    }
    async getShopppingCartIconText() {
        const shoppingCartIconText = await this.shoppingCartIcon.textContent();
        return shoppingCartIconText;
    }
    async getProductsRemoveFromCartButtonsCounts() {
        const productsRemoveFromCartButtonsCount = await this.productRemoveFromCartButton.count();
        return productsRemoveFromCartButtonsCount;
    }
    async removeProductFromCart() {
        await this.boltTShirtRemoveFromCartButton.click();
    }
    async clickOnContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }
    async clickOnCheckoutButton() {
        await this.checkOutButton.click();
    }
}