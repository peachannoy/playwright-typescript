import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  creditCardField: Locator;
  expirationMonthField: Locator;
  expirationYearField: Locator;
  cvvCodeField: Locator;
  nameOnCardField: Locator;
  countryField: Locator;
  countryDropDown: Locator;
  placeOrderButton: Locator;

  constructor(private page: Page) {
    this.creditCardField = page.locator(
      "//div[@class='form__cc']//div[1]//div[1]//input[1]"
    );
    this.expirationMonthField = page.locator("//body//app-root//select[1]");
    this.expirationYearField = page.locator(
      "(//select[@class='input ddl'])[2]"
    );
    this.cvvCodeField = page.locator("(//input[@type='text'])[2]");
    this.nameOnCardField = page.locator("(//input[@type='text'])[3]");
    this.countryField = page.locator(
      "(//input[@placeholder='Select Country'])[1]"
    );
    this.countryDropDown = page.locator(".ta-results");
    this.placeOrderButton = page.locator(".action__submit");
  }

  async placeOrder(
    creditCard: number,
    expirationMonth: number,
    expirationYear: number,
    cvvCode: number,
    nameOnCard: string,
    country: string
  ): Promise<string> {
    await this.creditCardField.fill(creditCard.toString());
    await this.expirationMonthField.selectOption(
      expirationMonth.toString().padStart(2, "0")
    );
    await this.expirationYearField.selectOption(
      expirationYear.toString().padStart(2, "0")
    );
    await this.cvvCodeField.fill(cvvCode.toString());
    await this.nameOnCardField.fill(nameOnCard);

    await this.countryField.type(country, { delay: 100 });
    await this.countryDropDown.waitFor();
    const optionsCount = await this.countryDropDown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = (await this.countryDropDown
        .locator("button")
        .nth(i)
        .textContent()) as string;
      if (
        text.toLowerCase().replace(/\s/g, "") ===
        country.toLowerCase().replace(/\s/g, "")
      ) {
        await this.countryDropDown.locator("button").nth(i).click();
        break;
      }
    }
    await this.placeOrderButton.click();

    await expect(this.page.locator(".hero-primary")).toHaveText(
      "Thankyou for the order."
    );
    const orderId: string = (await this.page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent()) as string;
    return orderId;
  }
}
