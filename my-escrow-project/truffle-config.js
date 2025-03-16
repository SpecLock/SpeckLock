const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = '56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027'; // Replace with your private key
const avalancheFujiTestnet = 'https://api.avax-test.network/ext/bc/C/rpc';

module.exports = {
  networks: {
    fuji: {
      provider: () => new HDWalletProvider(privateKey, avalancheFujiTestnet),
      network_id: '*',       // Match con cualquier id de red
      gas: 8000000,          // limite de gas
      gasPrice: 225000000000 // 225 gwei
    }
  },
  compilers: {
    solc: {
      version: '^0.8.4'
    }
  }
};