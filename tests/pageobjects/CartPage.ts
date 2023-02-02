import { Locator, Page } from "@playwright/test";

export class CartPage {
  checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator("//button[normalize-space()='Checkout']");
  }

  async findProduct(productname: string): Promise<boolean> {
    await this.page.waitForTimeout(500);

    if (await this.page.getByText(productname).isVisible()) {
      return true;
    }
    return false;
  }

  async removeProduct(productname: string){
    if(await this.findProduct(productname)){
      await this.page.click(`//h3[contains(text(), "${productname}")]/ancestor::li//button[contains(@class, "btn-danger")]`);
    }
  }

  async gotoCheckout(){
    await this.checkoutButton.click();
  }
}
