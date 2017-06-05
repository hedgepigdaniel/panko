import contract from 'truffle-contract'

import SimpleStorage from '../../contracts/SimpleStorage.sol'
import UploadLedger from '../../contracts/UploadLedger.sol'

export const contractArtifacts = {
  SimpleStorage,
  UploadLedger,
}

export const initialise = (contractArtifacts, web3) => {
  let contracts = {};
  for (const k in contractArtifacts) {
    const contract_ = contract(contractArtifacts[k])
    contract_.setProvider(web3.currentProvider)
    contracts[k] = contract_
  }
  return contracts
}
