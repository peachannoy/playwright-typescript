import faker from "faker";
import { test, expect } from "@playwright/test";
import { POManager } from "./pageobjects/POManager";
import { RegistrationPage } from "./pageobjects/RegistrationPage";
import { BasePage } from "./pageobjects/BasePage";
import { LoginPage } from "./pageobjects/LoginPage";
import { generatePassword } from "./utils/passwordGenerator";

for (let i = 0; i < 5; i++) {
  test(`Registration test number ${i}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const registrationPage: RegistrationPage = poManager.getRegistrationPage();

    await basePage.gotoBaseUrl();

    await loginPage.gotoRegister();

    const firstName: string = faker.name.firstName();
    const lastName: string = faker.name.lastName();
    const email: string = faker.internet.email();
    const phone: number = faker.datatype.number({
      min: 1000000000,
      max: 9999999999,
    });
    const occupation: number = faker.datatype.number({ min: 1, max: 4 });
    const gender: number = faker.random.arrayElement([1, 2]);
    const password: string = generatePassword();

    const bool = await registrationPage.register(
      firstName,
      lastName,
      email,
      phone,
      occupation,
      gender,
      password
    );
    expect(bool).toBeTruthy();
  });
}
