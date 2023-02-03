import { Locator, Page } from "@playwright/test";

export class OrdersPage {
  checkoutButton: Locator;
  orders: Locator;
  orderElements: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator(
      "//button[normalize-space()='Checkout']"
    );
    this.orders = page.locator("tbody tr");
    this.orderElements = this.orders.locator("th");
  }

  async findOrder(orderId: string): Promise<boolean> {
    await this.orders.first().waitFor();
    const orderCount = await this.orders.count();
    let orderFoundBool = false;
    for (let i = 0; i < orderCount; ++i) {
      const currentOrderId = (await this.orderElements
        .nth(i)
        .first()
        .textContent()) as string;
      if (orderId.includes(currentOrderId)) {
        orderFoundBool = true;
        await this.orders.nth(i).locator("button").first().click();
        break;
      }
    }
    return orderFoundBool;
  }
}
