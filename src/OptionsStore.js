'use-strict';
import Flux, { dispatcher as Dispatcher } from 'fluxify';
import constants from './constants';
import configuration from './configuration';
import _ from 'lodash';

let {
  LOAD_OPTIONS,
  API_COMMUNCATION_ERROR,
  SEND_RESOURCE_OPTIONS
} = constants.actions;

/**
 * Responsible for fetching and returning option data.
 * @module OptionsStore
 */
export default Flux.createStore({

  id: 'OptionsStore',

  initialState: {},

  actionCallbacks: {
    /**
     * Calls an API to retrieve options data. Optionally filters data with passed
     * in resourceFilter param.
     * @fires LOAD_OPTIONS, API_COMMUNCATION_ERROR
     * @param {object} data
     */
    [SEND_RESOURCE_OPTIONS](updater, data) {
      if (!configuration.API || !configuration.API.options) {
        throw new Error('API endpoint for options not configured.');
      }
      let id = data.fieldId;
      let optionsPromise = {};
      // inspect internal state first to see if we have already loaded the
      // requested options data
      if (!data.resourceFilter && updater.props[data.resourceName]) {
        optionsPromise = updater.props[data.resourceName];
        Dispatcher.dispatch(LOAD_OPTIONS, {id, optionsPromise});
      } else {
        let uri = `${configuration.API.options}/${data.resourceName}`;
        let params = {filter: data.resourceFilter};
        optionsPromise = $.getJSON(uri, params)
            .fail((jqxhr, textStatus, error) => {
              Dispatcher.dispatch(
                  API_COMMUNCATION_ERROR,
                  _.merge(data, {
                    hasError: true,
                    errorMessage: 'Error calling options API.'
                  })
              );
            });
        updater.set({[data.resourceName]: request});
        Dispatcher.dispatch(LOAD_OPTIONS, {id, optionsPromise});
      }
    }
  }
});
