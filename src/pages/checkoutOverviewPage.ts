import { BasePage } from "./basePage";

export class CheckoutOverviewPage extends BasePage {
    private paymentInfoLabel = this.page.getByText('Payment Information:');
    private paymentInfoValue = this.page.locator('//div[@data-test="payment-info-value"]');
    private shippingInfoLabel = this.page.getByText('Shipping Information:');
    private shippingInfoValue = this.page.locator('//div[@data-test="shipping-info-value"]');
    private totalInfoLabel = this.page.getByText('Price Total');
    private itemsTotalPrice = this.page.locator('.summary_subtotal_label');
    private tax = this.page.locator('.summary_tax_label');
    private totalPrice = this.page.locator('.summary_total_label');
    private productPrices = this.page.locator('.inventory_item_price');
    private finishButton = this.page.getByText('Finish');

    async getPaymentInfoLabel() {
        return (await this.paymentInfoLabel)
    }
    async getPaymentInfoValue() {
        return (await this.paymentInfoValue)
    }
    async getShippingInfoLabel() {
        return (await this.shippingInfoLabel)
    }
    async getShippingInfoValue() {
        return (await this.shippingInfoValue)
    }
    async getTotalInfoLabel() {
        return (await this.totalInfoLabel)
    }
    async getTotalItemsPrice() {
        const fullText = await this.itemsTotalPrice.textContent();
        if (fullText !== null) {
            const [, itemsPrice] = fullText.split('Item total: $');
            return (Number(itemsPrice))
        }
    }
    async sumItemsPrices() {
        let sum = 0;
        const produtsHandle = await this.productPrices.elementHandles();
        for (const productPrice of produtsHandle) {
            const text = await productPrice.textContent();
            if (text !== null) {
                let [, price] = text.split('$');
                if (!isNaN(Number(price))) {
                    sum += Number(price);
                }
            }
        }
        return sum;
    }
    async getAddedTax() {
        const fullText = await this.tax.textContent();
        if (fullText !== null) {
            const [, addedTax] = fullText.split('Tax: $');
            return (Number(addedTax))
        }
    }
    async getTotalOrderPrice() {
        const fullText = await this.totalPrice.textContent();
        if (fullText !== null) {
            const [, totalPrice] = fullText.split('Total: $');
            return (Number(totalPrice))
        }
    }
    async clickFinishButton() {
        await this.finishButton.click();
    }
}