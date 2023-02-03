import { Locator, Page } from "@playwright/test";

export class BasePage {
  private homeButton: Locator;
  private ordersButton: Locator;
  private cartButton: Locator;
  private signOutButton: Locator;

  constructor(private page: Page) {
    this.homeButton = this.page.locator("[routerlink*='dashboard']");
    this.ordersButton = this.page.locator("[routerlink*='myorders']");
    this.cartButton = this.page.locator("[routerlink*='cart']");
    this.signOutButton = this.page.locator(
      "li:nth-child(5) button:nth-child(1)"
    );
  }

  async gotoBaseUrl() {
    await this.page.goto("/client");
  }

  async checkLogInStatus(): Promise<boolean> {
    await this.page.waitForLoadState("domcontentloaded");
    const localStorage = await this.page.evaluate(() =>
      window.localStorage.getItem("token")
    );
    return localStorage != null;
  }

  async gotoHome() {
    await this.homeButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async gotoOrders() {
    await this.ordersButton.first().click();
    await this.page.waitForLoadState("networkidle");
  }
  async gotoCart() {
    await this.cartButton.click();
    await this.page.waitForLoadState("networkidle");
  }
  async signOut() {
    await this.signOutButton.click();
  }
}
