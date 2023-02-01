import { Locator, Page } from "@playwright/test";

export class CartPage {
  checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator("[value='Checkout']");
  }

  async findProduct(productname: string): Promise<boolean> {
    await this.page.waitForTimeout(200);

    if (await this.page.getByText(productname).isVisible()) {
      return true;
    }
    return false;
  }

  async removeProduct(productname: string){
    if(await this.findProduct(productname)){
      await this.page.pause();
      await this.page.click(`//h3[contains(text(), "${productname}")]/ancestor::li//button[contains(@class, "btn-danger")]`);
      await this.page.pause();
    }
  }
}
