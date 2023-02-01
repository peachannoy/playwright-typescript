import { test, expect } from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { ProductPage } from "./pageobjects/ProductPage";
import { POManager } from "./pageobjects/POManager";
import {
  Product,
  LoginCredentials,
  CheckoutData,
} from "./utils/dataImportInterfaces";
import { LoginPage } from "./pageobjects/LoginPage";
import { CartPage } from "./pageobjects/CartPage";
import { CheckoutPage } from "./pageobjects/CheckoutPage";
import { OrdersPage } from "./pageobjects/OrdersPage";

//Get valid Login and Product infos
const validLoginData: LoginCredentials[] = JSON.parse(
  JSON.stringify(require("./data/LoginData_Valid"))
);
const productsValid: Product[] = JSON.parse(
  JSON.stringify(require("./data/ProductData_Valid"))
);

//Get Checkout Data
const checkoutData: CheckoutData[] = JSON.parse(
  JSON.stringify(require("./data/CheckoutData_Valid"))
);

for (let i = 0; i < checkoutData.length; i++) {
  test.only(`Checkout for ID ${checkoutData[i].id}`, async ({ page }) => {
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();
    const productPage: ProductPage = poManager.getProductPage();
    const cartPage: CartPage = poManager.getCartPage();
    const checkoutPage: CheckoutPage = poManager.getCheckoutPage();
    const ordersPage: OrdersPage = poManager.getOrdersPage();

    await basePage.gotoBaseUrl();

    await loginPage.login(validLoginData[i].email, validLoginData[i].password);

    await productPage.searchProduct(productsValid[0].name);

    await productPage.addToCart();

    await basePage.gotoCart();

    await cartPage.gotoCheckout();

    const orderId = await checkoutPage.placeOrder(
      checkoutData[i].creditCard,
      checkoutData[i].exporationMonth,
      checkoutData[i].expirationYear,
      checkoutData[i].cvvCode,
      checkoutData[i].nameOnCard,
      checkoutData[i].country
    );

    await basePage.gotoOrders();

    const bool = await ordersPage.findOrder(orderId);
    expect(bool).toBeTruthy();
  });
}
