import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";
import { ProductPage } from "./ProductPage";

export class POManager {
  loginPage: LoginPage;
  basePage: BasePage;
  productPage: ProductPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(this.page);
    this.basePage = new BasePage(this.page);
    this.productPage = new ProductPage(this.page);
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
}
