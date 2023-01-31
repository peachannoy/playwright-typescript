import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";

export class POManager {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  basePage: BasePage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.basePage = new BasePage(this.page);
  }

  getBasePage(){
    return this.basePage;
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }
}
