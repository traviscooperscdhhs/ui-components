var React = require('react');
var Flux = require('fluxify');
var constants = require('./constants');
var cx = require('react/lib/cx');
var _ = require('lodash');

module.exports = {

  /**
   * Render a required indicator template if the field is required.
   * @returns {JSX, undefined}
   */
  getRequiredIndicator: function(){
    if ( this.props.required ) {
     return <span className="required-indicator"> *</span>;
    }
  },

  /**
   * Render the help-block text optionally displaying a validation error
   * if one exists.
   * @returns {JSX}
   */
  getHelpBlock: function(){
    var txt = this.state.hasError? this.state.errorMessage : this.props.helpText;
    return <span className="help-block">{txt}</span>;
  },

  /**
   * Return the classNames for the input wrapper.
   * @returns {string}
   */
  getFieldClassNames: function(){
    return cx({
      'form-group' : true,
      'editable-component' : true,
      'hidden' : !this.state.display,
      'has-error' : this.state.hasError
    });
  },

  /**
   * Event handler for onChange, that updates the field's state with the new value.
   * @fires field:value:change
   * @param {object} event
   */
  handleInputChange: function(event) {
    this.setState({value: event.target.value});
    var eventData = {
      id: this.props.id,
      name: this.props.name,
      value: event.target.value,
      type: this.props.type,
      rules : this.props.rules
    };
    Flux.doAction( constants.actions.FIELD_VALUE_CHANGE ,  eventData  );
  }
};