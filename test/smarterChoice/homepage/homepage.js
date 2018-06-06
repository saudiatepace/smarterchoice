'use strict';
var sChoiceUtils  = require('../../../utils/sChoiceUtils.js');
var commonUtils  = require('../../../utils/commonUtils.js');

describe("User Signing in to SmarterChoice", function() {

  sChoiceUtils.login();

});

describe("Check Dashboard in Home page", function() {
  it("should navigate to create new customer", function() {
    commonUtils.getHref('a[href="https://smarterchoice.us/development5/order/create_order"]')
    var url = browser.getUrl();

    expect(url).to.equal('https://smarterchoice.us/development5/order/create_order');
  });
})