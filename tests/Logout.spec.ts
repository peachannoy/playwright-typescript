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