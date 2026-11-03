import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** TTACart cart. */
export class CartPage extends BasePage {
    static readonly PATH = '/playwright/ttacart/cart';

    readonly title: Locator;
    readonly rows: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page, 'CartPage');
        const byTest = (id: string) => page.locator(`[data-test="${id}"]`);

        this.title = byTest('title');
        this.rows = byTest('inventory-item');
        this.checkoutButton = byTest('checkout');
    }

    async open(): Promise<void> {
        await this.goto(CartPage.PATH);
        await this.assertLoaded();
    }

    async assertLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/\/cart/);
        await expect(this.title).toHaveText('Your Cart');
    }

    // Retrying assertion: rows are rendered by JS after load, so an instant count reads 0.
    async expectRowCount(expected: number): Promise<void> {
        await expect(this.rows).toHaveCount(expected);
    }

    async checkout(): Promise<void> {
        await this.el.click(this.checkoutButton);
    }
}
