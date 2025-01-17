const { buildModule } = require('@nomicfoundation/ignition-core');

module.exports = buildModule('DeployBetaToken', (m) => {
  // Deploy betaToken
  const betaToken = m.contract('BetaToken');
  return { betaToken };

});