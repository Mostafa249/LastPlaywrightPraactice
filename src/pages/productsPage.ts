import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
    private listOfProducts = this.page.locator('.inventory_item');
    private productName = this.page.locator('.inventory_item_name ');
    private productImage = this.page.locator('.inventory_item_img');
    private productDesc = this.page.locator('.inventory_item_description');
    private productPrice = this.page.locator('.inventory_item_price');
    private productAddToCartButton = this.page.getByText('Add to cart');
    private backPackAddToCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
    private boltTShirtAddToCartButton = this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    private backPackRemoveFromCartButton = this.page.locator('#remove-sauce-labs-backpack');
    private boltTShirtRemoveFromCartButton = this.page.locator('#remove-sauce-labs-bolt-t-shirt');
    private drobListLocator = '[class="product_sort_container"]';
    private shoppingCartIcon = this.page.locator('.shopping_cart_container');

    async getProductsCount() {
        const productsCount = await this.listOfProducts.count();
        return productsCount;
    }
    async getProductsNamesCounts() {
        const productsNamesCount = await this.productName.count();
        return productsNamesCount;
    }
    async getProductsImagesCounts() {
        const productsImagesCount = await this.productImage.count();
        return productsImagesCount;
    }
    async getProductsDescCounts() {
        const productsDescCount = await this.productDesc.count();
        return productsDescCount;
    }
    async getProductsPricesCounts() {
        const productsPricesCount = await this.productPrice.count();
        return productsPricesCount;
    }
    async getProductsAddToCartButtonsCounts() {
        const productsAddToCartButtonsCount = await this.productAddToCartButton.count();
        return productsAddToCartButtonsCount;
    }
    async addTwoProductsToCart() {
        await this.backPackAddToCartButton.click();
        await this.boltTShirtAddToCartButton.click();
    }
    async removeTwoProductsFromCart() {
        await this.backPackRemoveFromCartButton.click();
        await this.boltTShirtRemoveFromCartButton.click();
    }
    async clickOnItemFromDrobDownFilter(element: string) {
        await this.page.selectOption(this.drobListLocator, `${element}`);
    }
    async clickOnShoppingCartIcon() {
        await this.shoppingCartIcon.click();
    }
  
}