var React = require('react');
require('es6-promise').polyfill();
var Field = require('../../src/Field');
var TestUtils = require('react/lib/ReactTestUtils');
var fixture = require('../fixtures/field-text.json');
var Flux = require('fluxify');
var Dispatcher = Flux.dispatcher;
var constants = require('../../src/constants');
var update = require('react/lib/update');

describe('Field component', function() {

  it('can manage viewable state', function(){
    var config = update(fixture, {
      value: { $set: 'foo' },
      dependencyName: { $set: 'testfield' },
      dependencyValue: {$set: 'bar'},
      initialState: {$set: 'hidden'}
    });
    var comp = TestUtils.renderIntoDocument(<Field {...config}/>);
    var dom = comp.getDOMNode();
    expect(/hidden/.test(dom.className)).toEqual(true);
  });

  it('can render error messages', function(done){
    var comp = TestUtils.renderIntoDocument(<Field {...fixture}/>);
    var eventData = {
      'id' : fixture.id,
      'hasError'    : true,
      'errorMessage' : 'It broke.'
    };
    Flux.doAction( constants.actions.FIELD_VALIDATION_ERROR ,  eventData );
    setTimeout(function(){
      var helpBlock = TestUtils.findRenderedDOMComponentWithClass(comp, 'help-block');
      expect(helpBlock.getDOMNode().textContent).toEqual('It broke.');
      expect(/error/.test(comp.getDOMNode().className)).toEqual(true);
      done();
    }, 300);
  });

  it('can render a FieldGroup', function(){
    var config = require('../fixtures/field-group.json');
    var comp = TestUtils.renderIntoDocument(<Field {...config}/>);
    var lgnd = TestUtils.findRenderedDOMComponentWithTag(comp, 'legend');
    var inpts = TestUtils.scryRenderedDOMComponentsWithTag(comp, 'input');
    expect(comp.getDOMNode().tagName.toLowerCase()).toEqual('fieldset');
    expect(lgnd.getDOMNode().textContent).toEqual(config.label);
    expect(inpts.length).toEqual(3);
  });
});
