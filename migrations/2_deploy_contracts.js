var FileLedger = artifacts.require("./FileLedger.sol");

module.exports = function(deployer) {
  deployer.deploy(FileLedger);
};
