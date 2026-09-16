const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');

const VALID = {
  username: process.env.STANDARD_USERNAME ?? 'standard_user',
  password: process.env.USER_PASSWORD ?? 'secret_sauce',
};

const INVALID_CREDENTIALS_MESSAGE = 'Epic sadface: Username and password do not match any user in this service';
const NO_CREDENTIALS_MESSAGE = 'Epic sadface: Username is required';

test.describe('TS-UI-AUTH-001 — Login ke aplikasi SauceDemo', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-UI-AUTH-001-1 — login dengan kredensial Admin yang valid', async ({ page }) => {
    await loginPage.login(VALID.username, VALID.password);

    await expect(loginPage.successLogin).toHaveText('ProductsName (A to Z)Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)');
  });

  test('TC-UI-AUTH-001-2 — login dengan password tidak sesuai', async ({ page }) => {
    await loginPage.login(VALID.username, 'salahpassword');

    await expect(loginPage.errorAlert).toHaveText(INVALID_CREDENTIALS_MESSAGE);
  });

  test('TC-UI-AUTH-001-3 — login dengan username tidak terdaftar', async ({ page }) => {
    await loginPage.login('UserTidakAda', VALID.password);

    // Pesan harus identik dengan kasus password salah agar sistem
    // tidak mengungkap apakah username atau password yang keliru
    await expect(loginPage.errorAlert).toHaveText(INVALID_CREDENTIALS_MESSAGE);
  });

  test('TC-UI-AUTH-001-4 — login dengan kolom username dan password kosong', async ({ page }) => {
    await loginPage.loginButton.click();

    await expect(loginPage.errorAlert).toHaveText(NO_CREDENTIALS_MESSAGE);
  });
});