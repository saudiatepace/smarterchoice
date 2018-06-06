'use strict';
var expect       = require('chai').expect;
var sChoiceUtils = require('../../../utils/sChoiceUtils.js');
var commonUtils  = require('../../../utils/commonUtils.js');
var chance       = require('chance');
var Chance       = new chance();
var moment       = require('moment');

var cust_fName = Chance.first();
var cust_lName = Chance.last();
var mrNum      = Chance.integer({ min: 1000, max: 9999 });

describe("User Signing in to SmarterChoice", function() {

  sChoiceUtils.login();

});

describe("Create a new customer", function() {

  it("should click the create new customer menu", function() {
    commonUtils.getHref('a[href="https://smarterchoice.us/development5/order/create_order"]')
    var url = browser.getUrl();

    expect(url).to.equal('https://smarterchoice.us/development5/order/create_order');
  });

  it("should navigate to customer profile section", function() {
    browser.scroll(0, 500);
    var custProfSec = browser.getText('#order_form_validate > div:nth-child(6) > div > div > div:nth-child(2) > div.panel-heading.font-bold');

    expect(custProfSec).to.equal('Customer Profile');
  });

  it("should complete hospice details", function() {
    commonUtils.getHospice('select[name="organization_id"]','Demo Hospice');
    commonUtils.getFName('input[name="person_placing_order_fname"]', Chance.first());
    commonUtils.getLName('input[name="person_placing_order_lname"]', Chance.last());
    commonUtils.getDate('input[name="delivery_date"]');
    commonUtils.getEmail('input[name="email"]', Chance.email());
    commonUtils.getPhoneNum('input[name="who_ordered_cpnum"]', Chance.phone());
  });

  it("should fill up the customer profile form", function() {
    var relationship = ['mother', 'father', 'spouse', 'guardian', 'sister', 'brother', 'daughter'];

    browser.setValue('input[name="patient_mrn"]', mrNum);
    commonUtils.getLName('input[name="patient_lname"]', cust_lName);
    commonUtils.getFName('input[name="patient_fname"]', cust_fName);
    commonUtils.getGender('#order_form_validate > div:nth-child(6) > div > div > div:nth-child(2) > div.panel-body >' 
      + ' div:nth-child(1) > div:nth-child(3) > div > label:nth-child('
      + Chance.integer({ min: 1, max: 2 }) +') > i');
    commonUtils.getHeight('input[name="patient_height"]', Chance.floating({ min: 60, max: 90, fixed: 2 }));
    commonUtils.getWeight('input[name="patient_weight"]', Chance.integer({ min: 100, max: 200 }));
    commonUtils.getResidence('select[name="dropdown_deliver_type"]', Chance.integer({ min: 1, max: 5 }));
    commonUtils.getAddress('input[name="p_address"]', Chance.address());
    commonUtils.getCity('input[name="patient_city"]', Chance.city());
    commonUtils.getState('input[name="patient_state"]', Chance.state({ full: true }));
    commonUtils.getPostalCode('input[name="patient_postalcode"]', Chance.zip());
    commonUtils.getPhoneNum('input[name="patient_phone_num"]', Chance.phone());
    commonUtils.getPhoneNum('input[name="patient_alt_phonenum"]', Chance.phone());

    // fill up emergency contact
    commonUtils.getName('input[name="patient_nextofkin"]', Chance.name());
    commonUtils.getRelationship('input[name="patient_relationship"]', relationship[Chance.integer({ min: 0, max: 5 })]);
    commonUtils.getPhoneNum('input[name="patient_nextofkinphonenum"]', Chance.phone());

  });

  it("should save the data as draft", function() {
    browser.click('#order_form_validate > div:nth-child(6) > div > div > div:nth-child(2) > div.panel-body > div:nth-child(2) > div:nth-child(6) > button');
    browser.pause(2000);
  });

  it("should verify the saved customer details", function() {
    commonUtils.getHref('a[href="https://smarterchoice.us/development5/draft_patient/customers"]');
    commonUtils.getHospice('select[name="hospice_sorting_id"]', 'Demo Hospice');

    var newCust = cust_lName + ', ' + cust_fName;
    var len = browser.elements('#patient_list_container > div > div > span').value.length;

    for(var i = 1; i < len; i++) {

      var custName = browser.getText('#patient_list_container > div:nth-child(' + i + ') > div > span');

      if(custName = newCust) {

        commonUtils.getHref('a[href="https://smarterchoice.us/development5/draft_patient/patient_profile/' + mrNum + '/13"]');

        expect(browser.getText('#app > div.app-content > div.app-content-body.fade-in-up > div:nth-child(4) >' 
         + ' div > div.well.m-t.bg-light.lt > div > div:nth-child(1) > h4')).to.equal(newCust.toUpperCase());  

        break;  
      }  
    }
    browser.pause(2000);

  });

});
