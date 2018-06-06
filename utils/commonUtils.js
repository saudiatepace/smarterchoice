'use strict';

var moment = require('moment');
var fs     = require('fs');

module.exports = {

  login: function(username, password, uElem, pElem, bElem) {
    browser.setValue(uElem, username);
    browser.setValue(pElem, password);
    browser.submitForm(bElem);
  },
  getHref: function(elem) { 	
  	browser.click(elem);
  },
  getFName: function(elem, fname) {
  	browser.setValue(elem, fname);
  },
  getLName: function(elem, lname) {
  	browser.setValue(elem, lname);
  },
  getGender: function(elem) {
  	browser.scroll(0, 500);
  	browser.click(elem);
  },
  getHeight: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getWeight: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getResidence: function(elem, index) {
  	browser.element(elem).selectByIndex(index);
  },
  getAddress: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getCity: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getState: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getPostalCode: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getPhoneNum: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getName: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getRelationship: function(elem, value) {
  	browser.setValue(elem, value);
  },
  getHospice: function(elem, value) {
  	browser.selectByVisibleText(elem, value);
  },
  getDate: function(elem) {
  	var date = moment(new Date()).format('YYYY-MM-DD');

  	browser.setValue(elem, date);
  },
  getEmail: function(elem, value) {
  	browser.setValue(elem, value);
  },

  saveFile: function( data, filename ) {
	  var createdAtt = [];

		  createdAtt.push(data)

		  fs.writeFile('./data/' + filename, JSON.stringify(createdAtt, null, '  '), function(err) {
		    if (err)
		      throw err;

			});
	}

};