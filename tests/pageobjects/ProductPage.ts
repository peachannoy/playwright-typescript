import { Locator, Page } from "@playwright/test";

export class ProductPage {
  products: Locator;
  productTitle: Locator;
  productPrice: Locator;
  productDetails: Locator;

  constructor(private page: Page) {
    this.products = page.locator(".card-body");
    this.productTitle = page.locator("h2");
    this.productPrice = page.locator("div[class='col-lg-6 rtl-text'] div h3");
    this.productDetails = page.locator("div[class='border-product'] p");
  }

  async searchProduct(productName: string): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState("networkidle");
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator("b").textContent()) == productName
      ) {
        await this.products.nth(i).locator("button").nth(0).click();
        await this.page.waitForTimeout(200);
        await this.page.waitForLoadState("networkidle");
        return true;
      }
    }
    return false;
  }

  async checkInfos(name: string, price: string): Promise<boolean> {
    const bool =
      (await this.productTitle.innerText()).toLowerCase() == name &&
      (await this.productPrice.innerText()) == price &&
      (await this.productDetails.innerText()) == name;

    return bool;
  }

  async addToCart() {
    await this.page.locator('button:text("Add to Cart")').click();
  }
}
