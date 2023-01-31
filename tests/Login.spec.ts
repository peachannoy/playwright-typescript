import {test, expect} from "@playwright/test";
import { BasePage } from "./pageobjects/BasePage";
import { LoginPage } from "./pageobjects/LoginPage";
import {POManager} from "./pageobjects/POManager";
import { LoginCredentials } from "./utils/dataImportInterfaces";
const validLoginData : LoginCredentials = JSON.parse(JSON.stringify(require("./data/validLoginData")));
const invalidLoginData : LoginCredentials = JSON.parse(JSON.stringify(require("./data/invalidLoginData")));

test('Valid Login', async ({page})=>
{
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    console.log(await loginPage.login("mail@britta.de", "Password1*"));
});

test('Incorrect email', async ({page})=>
{
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    console.log(await loginPage.login("ThisIsNotAMail", "Password1*"));
});

test('Missing email', async ({page})=>
{
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    console.log(await loginPage.login("", "Password1*"));
});

test('Missing password', async ({page})=>
{
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    console.log(await loginPage.login("mail@britta.de", ""));
});

test('Invalid Login', async ({page})=>
{
    const poManager: POManager = new POManager(page);
    const basePage: BasePage = poManager.getBasePage();
    const loginPage: LoginPage = poManager.getLoginPage();

    await basePage.gotoBaseUrl();

    console.log(await loginPage.login("mail@britta.de", "WrongPassword1*"));
});