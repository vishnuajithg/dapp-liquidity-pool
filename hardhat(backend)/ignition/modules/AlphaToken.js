const { buildModule } = require('@nomicfoundation/ignition-core');

module.exports = buildModule('DeployAlphaToken', (m) => {
  // Deploy alphaToken
  const alphaToken = m.contract('AlphaToken');
  return { alphaToken };

});