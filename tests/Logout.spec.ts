import { test, expect } from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { ProductPage } from "./pageobjects/ProductPage";
import { POManager } from "./pageobjects/POManager";
import { Product } from "./utils/dataImportInterfaces";
import { LoginCredentials } from "./utils/dataImportInterfaces";
import { LoginPage } from "./pageobjects/LoginPage";

//Get valid Login and Product infos
const validLoginData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_Valid"))
);
const productsValid: Product[] = JSON.parse(
  JSON.stringify(require("./data/ProductData_Valid"))
);

test("Checkout from Home", async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const basePage: BasePage = poManager.getBasePage();
  const loginPage: LoginPage = poManager.getLoginPage();

  await basePage.gotoBaseUrl();

  await loginPage.login(validLoginData[0].email, validLoginData[0].password);

  expect(await basePage.checkLogInStatus()).toBeTruthy();

  await basePage.signOut();

  expect(await basePage.checkLogInStatus()).toBeFalsy();
});

test("Checkout from Orders", async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const basePage: BasePage = poManager.getBasePage();
  const loginPage: LoginPage = poManager.getLoginPage();

  await basePage.gotoBaseUrl();

  await loginPage.login(validLoginData[0].email, validLoginData[0].password);

  await basePage.gotoOrders();

  expect(await basePage.checkLogInStatus()).toBeTruthy();

  await basePage.signOut();

  expect(await basePage.checkLogInStatus()).toBeFalsy();
});

test("Checkout from Cart", async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const basePage: BasePage = poManager.getBasePage();
  const loginPage: LoginPage = poManager.getLoginPage();

  await basePage.gotoBaseUrl();

  await loginPage.login(validLoginData[0].email, validLoginData[0].password);

  await basePage.gotoCart();

  expect(await basePage.checkLogInStatus()).toBeTruthy();

  await basePage.signOut();

  expect(await basePage.checkLogInStatus()).toBeFalsy();
});

test("Checkout from Productview", async ({ page }) => {
  const poManager: POManager = new POManager(page);
  const basePage: BasePage = poManager.getBasePage();
  const loginPage: LoginPage = poManager.getLoginPage();
  const productPage: ProductPage = poManager.getProductPage();

  await basePage.gotoBaseUrl();

  await loginPage.login(validLoginData[0].email, validLoginData[0].password);

  await productPage.searchProduct(productsValid[0].name);

  expect(await basePage.checkLogInStatus()).toBeTruthy();

  await basePage.signOut();

  expect(await basePage.checkLogInStatus()).toBeFalsy();
});
