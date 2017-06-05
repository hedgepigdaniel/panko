const SimpleStorage = artifacts.require('../contracts/SimpleStorage.sol')
const UploadLedger = artifacts.require('../contracts/UploadLedger.sol')

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(UploadLedger);
};
