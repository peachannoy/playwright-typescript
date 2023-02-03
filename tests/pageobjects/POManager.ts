import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";
import { RegistrationPage } from "./RegistrationPage";

export class POManager {
  loginPage: LoginPage;
  basePage: BasePage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;
  registrationPage: RegistrationPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(this.page);
    this.basePage = new BasePage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
    this.registrationPage = new RegistrationPage(this.page);
  }

  getBasePage() {
    return this.basePage;
  }

  getLoginPage() {
    return this.loginPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getOrdersPage() {
    return this.ordersPage;
  }

  getRegistrationPage() {
    return this.registrationPage;
  }
}
