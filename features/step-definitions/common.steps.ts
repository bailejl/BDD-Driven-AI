import { Given, When, Then } from '@cucumber/cucumber';
import homePage from '../pageobjects/home.page';
import loginPage from '../pageobjects/login.page';

Given(/^"(.*)" logs in$/, async ({ dataManager }, userNameAlias) => {
  const userData = dataManager.getData(userNameAlias, true);
  homePage.open();
  loginPage.login(userData.username, userData.password);
});

Given(
  /^"(.*)" logs in with these mods$/, async ({ dataManager }, userNameAlias, table) => {
    const modDataNames = dataManager.getDataTableColumnValues(table, 0);
    const userData = dataManager.getDataWithMods(userNameAlias, modDataNames);
    homePage.open();
    loginPage.login(userData.username, userData.password);
  }
);

Given(
  /^"(.*)" logs in with this mod '(.*)'$/, async ({ dataManager }, userNameAlias, modName) => {
    const userData = dataManager.getDataWithMods(userNameAlias, [modName]);
    homePage.open();
    loginPage.login(userData.username, userData.password);
  }
);
