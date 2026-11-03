import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** TTACart product listing. */
export class InventoryPage extends BasePage {
    static readonly PATH = '/playwright/ttacart/inventory';

    readonly title: Locator;
    readonly items: Locator;

    constructor(page: Page) {
        super(page, 'InventoryPage');
        this.title = page.locator('[data-test="title"]');
        this.items = page.locator('[data-test="inventory-item"]');
    }

    async open(): Promise<void> {
        await this.goto(InventoryPage.PATH);
        await this.assertLoaded();
    }

    async assertLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/inventory/);
        await expect(this.title).toHaveText('Products');
        await expect(this.items.first()).toBeVisible();
    }

    /** Adds a product by its id, e.g. 'test-allthethings-tshirt-red'. */
    async addToCart(itemId: string): Promise<void> {
        await this.el.click(`[data-test="add-to-cart-${itemId}"]`);
        // The button flips to "Remove" once the item is really in the cart.
        await this.el.waitForVisible(`[data-test="remove-${itemId}"]`);
    }
}
