import React from 'react';
import Factory from '../../src/Factory';
import elements from '../../src/index';
import EntryList from '../../src/EntryList';
import TestUtils from 'react/lib/ReactTestUtils';

let config = require('../fixtures/entrylist-config.json');

describe('EntryList', function(){
  let entrylist = Factory.build(elements, config, config)[0];
  let dom = TestUtils.renderIntoDocument(entrylist);
  let tbodyDom = TestUtils.findRenderedDOMComponentWithTag(dom, 'tbody').getDOMNode();
  let entries = tbodyDom.childNodes;

  it('renders an entrylist', function(){
    expect(tbodyDom).toBeDefined();
    expect(entries.length).toEqual(config.model.medicaidNumbers.length);
  });

  it('can facilitate removal of entries', function(done){
    // click Remove link on the first entry to remove it
    let removeFirstEntry = TestUtils.scryRenderedDOMComponentsWithTag(dom, 'a')[0];
    expect(entries.length).toEqual(config.model.medicaidNumbers.length);
    TestUtils.Simulate.click(removeFirstEntry);
    setTimeout(function() {
      expect(entries.length).toEqual(config.model.medicaidNumbers.length - 1);
      done();
    }, 200);
  });

  it('can facilitate adding new entries', function(done){
    // click Add New Entry button to show new entry form
    let addNewEntryBtn = TestUtils.findRenderedDOMComponentWithClass(dom, 'btn-primary');
    TestUtils.Simulate.click(addNewEntryBtn);
    setTimeout(function() {
      // click Add button to add the entry
      let addEntry = TestUtils.findRenderedDOMComponentWithClass(dom, 'btn-default');
      expect(entries.length).toEqual(config.model.medicaidNumbers.length - 1);
      TestUtils.Simulate.click(addEntry);
      setTimeout(function() {
        expect(entries.length).toEqual(config.model.medicaidNumbers.length);
        done();
      }, 200);
    }, 200);
  });
});
