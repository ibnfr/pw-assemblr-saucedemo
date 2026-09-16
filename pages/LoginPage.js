class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.errorAlert = page.locator('[data-test="error"]');
    this.successLogin = page.locator('[data-test="secondary-header"]');
  }

  async goto() {
    await this.page.goto(process.env.BASE_URL ?? 'https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAs({ username, password }) {
    await this.goto();
    await this.login(username, password);
  }
}

module.exports = { LoginPage };