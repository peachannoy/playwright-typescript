import { test, expect } from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { ProductPage } from "./pageobjects/ProductPage";
import { POManager } from "./pageobjects/POManager";
import { Product } from "./utils/dataImportInterfaces";
import { LoginCredentials } from "./utils/dataImportInterfaces";
import { LoginPage } from "./pageobjects/LoginPage";
import { sanitizeFileName } from "./utils/sanitizeFileName";

//Get valid Login and Product infos
const validLoginData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_Valid"))
);
const productsValid: Product[] = JSON.parse(
  JSON.stringify(require("./data/ProductData_Valid"))
);
const productsInvalid: Product[] = JSON.parse(
  JSON.stringify(require("./data/ProductData_Invalid"))
);
const productsPriceInvalid: Product[] = JSON.parse(
  JSON.stringify(require("./data/ProductData_PriceInvalid"))
);

for (const data of productsValid) {
  test(`Valid Product View for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const productPage: ProductPage = poManager.getProductPage();

    await basePage.gotoBaseUrl();

    await loginPage.login(validLoginData[0].email, validLoginData[0].password);

    //Check wether the product has been found
    const bool = await productPage.searchProduct(data.name);
    expect(bool).toBeTruthy();

    await page.screenshot({path: `./screenshots/Product/ScreenshotProductFor${sanitizeFileName(data.name)}.png`})

    //Check wether all information are correct and visible
    const bool2 = await productPage.checkInfos(data.name, data.price);
    expect(bool2).toBeTruthy();
  });
}

for (const data of productsInvalid) {
  test(`Invalid Product View for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const productPage: ProductPage = poManager.getProductPage();

    await basePage.gotoBaseUrl();

    await loginPage.login(validLoginData[0].email, validLoginData[0].password);

    //Check wether the product has been found
    const bool = await productPage.searchProduct(data.name);
    expect(bool).toBeFalsy();
  });
}

for (const data of productsPriceInvalid) {
  test(`Invalid Details Product View for ID ${data.id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const productPage: ProductPage = poManager.getProductPage();

    await basePage.gotoBaseUrl();

    await loginPage.login(validLoginData[0].email, validLoginData[0].password);

    //Check wether the product has been found
    const bool = await productPage.searchProduct(data.name);
    expect(bool).toBeTruthy();

    //Check wether all information are correct and visible
    const bool2 = await productPage.checkInfos(data.name, data.price);
    expect(bool2).toBeFalsy();
  });
}
