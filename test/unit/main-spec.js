import React from 'react';
import Components from '../../src/main';
import TestUtils from 'react-addons-test-utils';

describe('main component', () => {
  it('exposes the list of elements', () => {
    expect(Components.elements).toBeDefined();
  });
});
