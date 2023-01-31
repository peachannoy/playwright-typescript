import { Locator, Page } from "@playwright/test";
import { LoginResults } from "../utils/loginResults"; 

export class LoginPage{
    userNameField: Locator;
    passwordField: Locator;
    signInButton: Locator;
    missingEmail: Locator;
    missingPassword: Locator;
    invalidEmail: Locator;
    incorrectData: Locator;

    constructor(private page: Page)
     {
        this.userNameField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.signInButton = page.locator("[value='Login']");
        this.missingEmail = page.getByText("*Email is required");
        this.missingPassword = page.getByText("*Password is required");
        this.invalidEmail = page.getByText("*Enter Valid Email");
        this.incorrectData = page.getByText("Incorrect email or password.");
     }

     async login(username: string, password: string): Promise<LoginResults> {
      await this.userNameField.type(username);
      await this.passwordField.type(password);
      await this.signInButton.click();
      await this.page.waitForLoadState('networkidle');
    
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
}
