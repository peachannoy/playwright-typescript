import { Locator, Page } from "@playwright/test";
import { LoginResults } from "../utils/loginResults";

export class LoginPage {
  emailField: Locator;
  passwordField: Locator;
  signInButton: Locator;
  missingEmail: Locator;
  missingPassword: Locator;
  invalidEmail: Locator;
  incorrectData: Locator;
  registerButton: Locator;

  constructor(private page: Page) {
    this.emailField = page.locator("#userEmail");
    this.passwordField = page.locator("#userPassword");
    this.signInButton = page.locator("[value='Login']");
    this.missingEmail = page.getByText("*Email is required");
    this.missingPassword = page.getByText("*Password is required");
    this.invalidEmail = page.getByText("*Enter Valid Email");
    this.incorrectData = page.getByText("Incorrect email or password.");
    this.registerButton = page.locator("//a[normalize-space()='Register']");
  }

  async login(email: string, password: string): Promise<LoginResults> {
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.signInButton.click();
    await this.page.waitForTimeout(500);
    await this.page.waitForLoadState("networkidle");

    if (await this.missingEmail.isVisible()) {
      return LoginResults.MISSINGEMAIL;
    }

    if (await this.missingPassword.isVisible()) {
      return LoginResults.MISSINGPASSWORD;
    }

    if (await this.invalidEmail.isVisible()) {
      return LoginResults.INVALIDEMAIL;
    }

    if (await this.incorrectData.isVisible()) {
      return LoginResults.INVALID;
    }

    return LoginResults.VALID;
  }

  async gotoRegister() {
    await this.registerButton.click();
  }
}
