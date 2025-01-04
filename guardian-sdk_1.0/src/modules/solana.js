
const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');

class Solana {
  constructor(cluster = 'devnet') {
    this.connection = new Connection(clusterApiUrl(cluster), 'confirmed');
  }

  async getBalance(publicKey) {
    const balance = await this.connection.getBalance(new PublicKey(publicKey));
    return balance / 1e9; // Convert from lamports to SOL
  }

  async createAccount() {
    const keypair = Keypair.generate();
    return keypair;
  }

  async sendTransaction(fromKeypair, toPublicKey, amount) {
    const transaction = await this.connection.requestAirdrop(fromKeypair.publicKey, amount * 1e9);
    await this.connection.confirmTransaction(transaction);
    return transaction;
  }
}

module.exports = Solana;
