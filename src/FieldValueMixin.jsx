var React = require('react');
var Flux = require('fluxify');
var Dispatcher = Flux.dispatcher;
var constants = require('./constants');
var _ = require('lodash');

/**
 * @module FieldValueMixin
 */
module.exports = {

  /**
   * Registers listener that will fire event containing the field's current value.
   */
  componentDidMount: function(){
    Dispatcher.register( this.props.id + '-FIELD-VALUE' , function(action,data){
      if( action === constants.actions.GET_FIELD_VALUE &&
          data.id === this.props.id) {
        Flux.doAction(constants.actions.FIELD_VALUE, {
          id : this.props.id,
          name : this.props.name,
          value : _.has(this.state,'value') ? this.state.value : this.props.value
        });
      }
    }.bind(this));
  },

  componentWillUnmount: function(){
    Dispatcher.unregister( this.props.id + '-FIELD-VALUE');
  }

};