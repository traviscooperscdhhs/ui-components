var React = require('react');
var Flux = require('fluxify');
var constants = require('./constants');
var Immutable = require('immutable');
var _ = require('lodash');

/**
 * Provides a default onChange handler for Field.
 * @module ValueChangeMixin
 */
module.exports = {
  /**
   * Handles the onChange event for an input component. You may customize the functionality
   * of this method by passing in extra configuration data on the event object.
   * @fires FIELD_VALUE_CHANGE
   * @param {object} event - { target: ..., actionName: String, stateChange: Object }
   * @param {boolean} fieldValueChangeAction - optionally pass in to use custom onChange
   * action name rather than the default FIELD_VALUE_CHANGE action.
   */
  onChange: function(event){
    var actionName = this.props.fieldValueChangeAction || event.actionName || constants.actions.FIELD_VALUE_CHANGE;
    var state = event.stateChange || {value: event.target.value};
    var payload = Immutable.fromJS(this.props).withMutations((mutablePayload) => {
      mutablePayload.set('visible', this.state.visible);
      if (this.props.mask) {
        mutablePayload.set('value',state.value);
        mutablePayload.set('unmasked', state.unmasked);
      } else {
        mutablePayload.set('value',event.target.value);
        if (event.target.dateString) {
          mutablePayload.set('dateString',event.target.dateString);
        }
      }
    });
    this.setState(state);
    Flux.doAction(actionName, payload.toJSON());
  },

  /**
   * Handles the onBlur event of a Field and sends the Field's data in an action
   * call. The ValidationStore has a handler for the FIELD_BLUR action and performs
   * validation when called.
   * @fires FIELD_BLUR
   */
  onBlur: function(event){
    var payload = _.extend({ value: this.state.value }, this.props);
    Flux.doAction(constants.actions.FIELD_BLUR, payload);
  }
};
