
class Rewards {
  constructor(solanaInstance, splTokenInstance) {
    this.solana = solanaInstance;
    this.splToken = splTokenInstance;
  }

  async rewardWithSolana(userPublicKey, amount) {
    return await this.solana.sendTransaction(this.solana.createAccount(), userPublicKey, amount);
  }

  async rewardWithSPLToken(userPublicKey, token, amount) {
    return await this.splToken.transferTokens(token, userPublicKey, amount);
  }
}

module.exports = Rewards;
