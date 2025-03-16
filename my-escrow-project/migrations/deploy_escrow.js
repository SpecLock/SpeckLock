const Escrow = artifacts.require("Escrow");

module.exports = function (deployer) {
  const totalCapital = web3.utils.toWei("10", "avax"); // Reemplaza con la cantidad de capital eth (pruebas)
  deployer.deploy(Escrow, totalCapital, { value: totalCapital });
};