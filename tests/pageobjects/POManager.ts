import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";


export class POManager {
  loginPage: LoginPage;
  basePage: BasePage;
  productPage: ProductPage;
  cartPage: CartPage

  constructor(private page: Page) {
    this.loginPage = new LoginPage(this.page);
    this.basePage = new BasePage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getBasePage(){
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
}
