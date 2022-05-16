const chai = require('chai');
const { describe } = require('mocha');

const { expect } = chai;

describe('smoke test', () => {
  it('checks equality', () => {
    expect(true).to.be.true;
  });
});
