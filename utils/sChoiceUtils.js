'use strict';

var expect       = require('chai').expect;
var commonUtils  = require('./commonUtils.js');

module.exports = {

  login: function() {
    it("should navigate to smarterchoice login page", function(){
      browser.url('https://smarterchoice.us/development5');
      browser.click('a[href="https://smarterchoice.us/development5/main/login"]');
      var url = browser.getUrl();
      expect(url).to.equal('https://smarterchoice.us/development5/main/login');
    });

    it("should be able to sign in using valid and active account", function(){
      commonUtils.login('smartstart', 'march12', 'input[name="username"]', 'input[name="password"]', '#user_login_form');
      browser.pause(2000);
      var url = browser.getUrl();

      expect(url).to.equal('https://smarterchoice.us/development5/menu');
    });

    it("should make sure that the right user is logged in", function(){
      var user = browser.getText('#app > div.app-header.navbar > div.collapse.pos-rlt.navbar-collapse.box-shadow.bg-white-only > ul > li > a > span');

      expect(user).to.equal('JOHN D.');
    });
  }
};

