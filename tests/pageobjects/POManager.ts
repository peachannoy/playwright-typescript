const { DashboardPage } = require('./DashboardPage');
const {LoginPage} = require('./LoginPage');
import {BasePage} from './BasePage';

export class POManager
{
    page: any;
    loginPage: any;
    dashboardPage: any;
    basePage: BasePage;
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.basePage = new BasePage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
}

module.exports = {POManager}