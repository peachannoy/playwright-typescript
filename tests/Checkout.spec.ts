import { test, expect } from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { ProductPage } from "./pageobjects/ProductPage";
import { POManager } from "./pageobjects/POManager";
import { Product } from "./utils/dataImportInterfaces";
import { LoginCredentials } from "./utils/dataImportInterfaces";
import { LoginPage } from "./pageobjects/LoginPage";
import { CartPage } from "./pageobjects/CartPage";


//Get valid Login and Product infos
const validLoginData: LoginCredentials[] = JSON.parse(
    JSON.stringify(require("./data/LoginData_Valid"))
  );
const productsValid: Product[] = JSON.parse(
    JSON.stringify(require("./data/ProductData_Valid"))
  );

  //Each product is tested on different accounts
  for (let i = 0; i < productsValid.length; i++) {
  test(`Valid checkout for ID ${productsValid[i].id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const productPage: ProductPage = poManager.getProductPage();
    const cartPage: CartPage = poManager.getCartPage();

    await basePage.gotoBaseUrl();

    await loginPage.login(validLoginData[i].email, validLoginData[i].password);

    //Check wether the product has been found
    const bool = await productPage.searchProduct(productsValid[i].name);
    expect(bool).toBeTruthy();

    await productPage.addToCart();

    await basePage.gotoCart();

    const bool2 = await cartPage.findProduct(productsValid[i].name)
    expect(bool2).toBeTruthy();

    await cartPage.removeProduct(productsValid[i].name);

  });
}