import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** TTACart login screen. */
export class LoginPage extends BasePage {
    static readonly PATH = '/playwright/ttacart/';

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorBox: Locator;

    constructor(page: Page) {
        super(page, 'LoginPage');
        this.emailInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        // TTACart uses data-test, not Playwright's default data-testid.
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorBox = page.locator('[data-test="error"]');
    }

    async open(): Promise<void> {
        await this.goto(LoginPage.PATH);
    }

    async loginAs(username: string, password: string): Promise<void> {
        await this.el.fill(this.emailInput, username);
        await this.el.fill(this.passwordInput, password);
        await this.el.click(this.loginButton);
    }

    async expectErrorContains(text: string): Promise<void> {
        await expect(this.errorBox).toBeVisible();
        await expect(this.errorBox).toContainText(text);
    }

    async waitForLoginButtonHidden(): Promise<void> {
        await this.el.waitForHidden(this.loginButton);
    }

    // Older names, kept so existing specs (Login.spec.ts) keep working.
    override async goto(relativePath: string = LoginPage.PATH): Promise<void> {
        await super.goto(relativePath);
    }

    async login(username: string, password: string): Promise<void> {
        await this.loginAs(username, password);
    }
}
