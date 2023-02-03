import { test, expect } from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { LoginPage } from "./pageobjects/LoginPage";
import { POManager } from "./pageobjects/POManager";
import { LoginCredentials } from "./utils/dataImportInterfaces";
import { LoginResults } from "./utils/loginResults";
import { sanitizeFileName } from "./utils/sanitizeFileName";

//Get all testing data
const validLoginData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_Valid"))
);
const invalidLoginData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_Invalid"))
);
const invalidEmailData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_MailInvalid"))
);

for (const data of validLoginData) {
  test(`Valid Login for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    const bool =
      (await loginPage.login(data.email, data.password)) == LoginResults.VALID;
    expect(bool).toBeTruthy();

    await page.screenshot({path: `./screenshots/Login/ScreenshotLoginFor${sanitizeFileName(data.email)}.png`})

  });
}

for (const data of invalidEmailData) {
  test(`Invalid email for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    const bool =
      (await loginPage.login(data.email, data.password)) ==
      LoginResults.INVALIDEMAIL;
    expect(bool).toBeTruthy();
  });
}

//Valid login data is being used, but the email field is left empty
for (const data of validLoginData) {
  test(`Missing email for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    const bool =
      (await loginPage.login("", data.password)) == LoginResults.MISSINGEMAIL;
    expect(bool).toBeTruthy();
  });
}

//Valid login data is being used, but the email field is left empty
for (const data of validLoginData) {
  test(`Missing Password for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    const bool =
      (await loginPage.login(data.email, "")) == LoginResults.MISSINGPASSWORD;
    expect(bool).toBeTruthy();
  });
}

for (const data of invalidLoginData) {
  test(`Invalid Login for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    const bool =
      (await loginPage.login(data.email, data.password)) ==
      LoginResults.INVALID;
    expect(bool).toBeTruthy();
  });
}
