require('babel-core/register');
const config = require('../../../nightwatch.conf.js');
const faker = require('faker');

const doctTitle = faker.lorem.words();
const titlechunk = doctTitle.split(' ')[1];

module.exports = { // adapted from: https://git.io/vodU0
  'Document Test': (browser) => {
    browser.resizeWindow(1280, 800)
      .url('http://localhost:3000/login')
      .waitForElementVisible('body')
      .assert.title('Wedoc')
      .waitForElementVisible('input[name=email]', 5000)
      .setValue('input[name=email]', 'etajuder@gmail.com')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', 'password')
      .click('input[type=submit]')
      .pause(3000)
      .waitForElementVisible('form', 5000)
      .pause(1000)
      .setValue('input[name=title]', doctTitle)
      .frame(0)
      .setValue('.mce-content-body', faker.lorem.paragraphs())
      .frame(null)
      .setValue('select[name=permission]', 'public')
      .click('button[type=submit]')
      .waitForElementVisible('.toast-success', '.toast-message')
      .assert.containsText('.toast-message', 'Document Created')
      .pause(1000)
      .click('.public-doc')
      .pause(1000)
      .waitForElementVisible('.document-card')
      .pause(3000)
      .getLocationInView('.rc-pagination')
      .useXpath()
      .click('//li[@title=2]')
      .pause(3000)
      .click('//li[@title=3]')
      .pause(3000)
      .click('//li[@title=4]')
      .pause(3000)
      .click('//li[@title=1]')
      .useCss()
      .waitForElementVisible('.document-card')
      .pause(3000)
      .getLocationInView('.breadcrumbs-title')
      .click('.fa-eye')
      .pause(3000)
      .waitForElementVisible('h1')
      .click('.my-doc')
      .waitForElementVisible('.document-card', 3000)
      .click('.fa-trash')
      .pause(5000)
      .waitForElementVisible('.notification-action-wrapper', 3000)
      .click('.notification-action-button')
      .pause(5000)
      .click('.fa-power-off')
      .pause(1000)
      .end();
  },
};
