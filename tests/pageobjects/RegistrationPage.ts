import { Locator, Page } from "@playwright/test";

export class RegistrationPage {
  firstNameField: Locator;
  lastnameField: Locator;
  emailField: Locator;
  phoneField: Locator;
  occupationField: Locator;
  femaleButton: Locator;
  maleButton: Locator;
  passwordField: Locator;
  confimPasswordField: Locator;
  ageCheckBox: Locator;
  registerButton: Locator;
  successfulRegistration: Locator;

  constructor(private page: Page) {
    this.firstNameField = page.locator("//input[@id='firstName']");
    this.lastnameField = page.locator("//input[@id='lastName']");
    this.emailField = page.locator("//input[@id='userEmail']");
    this.phoneField = page.locator("//input[@id='userMobile']");
    this.occupationField = page.locator("select[formcontrolname='occupation']");
    this.femaleButton = page.locator("//input[@value='Female']");
    this.maleButton = page.locator("//input[@value='Male']");
    this.passwordField = page.locator("//input[@id='userPassword']");
    this.confimPasswordField = page.locator("//input[@id='confirmPassword']");
    this.ageCheckBox = page.locator("//input[@type='checkbox']");
    this.registerButton = page.locator("//input[@id='login']");
    this.successfulRegistration = page.getByText(
      "Account Created Successfully"
    );
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    occupation: number,
    gender: number,
    password: string
  ): Promise<boolean> {
    await this.firstNameField.type(firstName);
    await this.lastnameField.type(lastName);
    await this.emailField.type(email);
    await this.phoneField.type(phone.toString());
    await this.occupationField.selectOption({ index: occupation });
    if (gender == 1) {
      await this.femaleButton.click();
    } else {
      await this.maleButton.click();
    }
    await this.passwordField.type(password);
    await this.confimPasswordField.type(password);
    await this.ageCheckBox.click();
    await this.page.pause();
    await this.registerButton.click();
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState("networkidle");
    return await this.successfulRegistration.isVisible();
  }
}
