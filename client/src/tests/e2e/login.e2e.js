require('babel-core/register');
const config = require('../../../nightwatch.conf.js');
const faker = require('faker');

module.exports = { // adapted from: https://git.io/vodU0
  'Login tests': (browser) => {
    browser.resizeWindow(1280, 800)
      .url('http://localhost:3000/login')
      .waitForElementVisible('body')
      .assert.title('Wedoc')
      .waitForElementVisible('input[name=email]', 5000)
      .setValue('input[name=email]', 'someundefinedemail@email.com')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', 'password')
      .click('input[type=submit]')
      .pause(1000)
      .waitForElementPresent('.toast-message', 10000)
      .assert.containsText('.toast-message', 'Invalid credentials supplied')
      .clearValue('input[name=email]')
      .clearValue('input[name=password]')
      .pause(1000)
      .saveScreenshot('login')
      .setValue('input[name=email]', 'wapjude@gmail.com')
      .setValue('input[name=password]', 'rubbishpassword')
      .click('input[type=submit]')
      .waitForElementPresent('.toast-message', 50000)
      .pause(1000)
      .assert.containsText('.toast-message', 'Invalid credentials supplied')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'wapjude@gmail.com')
      .clearValue('input[name=password]')
      .setValue('input[name=password]', 'password')
      .click('input[type=submit]')
      .waitForElementPresent('.toast-message', 50000)
      .pause(1000)
      .assert.containsText('.toast-message', 'Login Successful')
      .pause(1000)
      .click('.fa-power-off')
      .pause(1000)
      .end();
  },
};
