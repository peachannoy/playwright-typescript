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
    this.signOutButton = this.page.locator("li:nth-child(4) button:nth-child(1)");
  }

  async gotoHome() {
    await this.homeButton.click();
  }
  async gotoOrders() {
    await this.ordersButton.click();
  }
  async gotoCart() {
    await this.cartButton.click();
  }
  async signOut(){
    await this.signOutButton.click();
  }
}
