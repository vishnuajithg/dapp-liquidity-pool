const { buildModule } = require('@nomicfoundation/ignition-core');

const address1 = '0x464EDc5ccEd42175ac8c1CD67Ce3d7E5a32C60d7';
const address2 = '0x859a2C59ec69eC489B5293384394C3c6f58A8383';

module.exports = buildModule('DeployLiquidity', (m) => {
  // Deploy LiquidityPool
  const liquidityPool = m.contract('LiquidityPool',[address1, address2]);
  return { liquidityPool };

});