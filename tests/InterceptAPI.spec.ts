//const {test, expect, request} = require('@playwright/test');
import {test, expect, request} from "@playwright/test";
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "mail@britta.de", userPassword: "Password1*"}
const orderPayLoad = {orders:[{country:"Germany",productOrderedId:"6262e9d9e26b7e1a10e89c04"}]};
const fakePayLoadOrders = {data:[],message:"No Orders"};
let orderId;
let apiUtils;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayLoad);
    orderId =await apiUtils.createOrder(orderPayLoad);
});

test('Abort Network Calls', async ({page})=>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, await apiUtils.getToken())
    page.route("**/*.{jpg,png,jpeg}", route=> route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    


});

test('Screenshot', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "partialscreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.png"});
    await expect(page.locator("displayed-text")).toBeHidden();
})
