require('babel-core/register');
const config = require('../../../nightwatch.conf.js');
const faker = require('faker');

module.exports = {
  'Signup tests': (browser) => {
    browser
      .resizeWindow(1280, 800)
      .url('http://localhost:3000/')
      .waitForElementVisible('body')
      .assert.title('Wedoc')
      .waitForElementVisible('.btn-large', 5000)
      .click('.btn-large')
      .waitForElementVisible('.login-form', 5000)
      .waitForElementVisible('a[href="signup"]', 1000)
      .click('a[href="signup"]')
      .waitForElementVisible('.signup-form', 5000)
      .setValue('input[name="fullNames"]', `${faker.name.firstName()} ${faker.name.lastName()}`)
      .setValue('input[name=email]', 'wapjude@gmail.com')
      .setValue('input[name=username]', faker.internet.userName())
      .setValue('input[name=password]', 'password')
      .setValue('input[name=passwordAgain]', 'different')
      .click('button[type=submit]')
      .waitForElementVisible('#passwordAgain-error', 5000)
      .assert.containsText('#passwordAgain-error',
      'Please enter the same value again.')
      .clearValue('input[name=passwordAgain]')
      .setValue('input[name=passwordAgain]', 'password')
      .pause(1000)
      .click('button[type=submit]')
      .waitForElementVisible('.email-error', 1000)
      .pause(4000)
      .assert.containsText('.email-error', 'This email is in existence please choose a new one or login')
      .pause(1000)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', faker.internet.email())
      .click('button[type=submit]')
      .waitForElementPresent('.toast-message', 10000)
      .assert.containsText('.toast-message', 'Account Created Successfully')
      .pause(1000)
      .click('.fa-power-off')
      .pause(1000)
      .end();
  },
};
