
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

class SPLToken {
  constructor(connection) {
    this.connection = connection;
  }

  async createToken(accountKeypair, mintAmount = 1000) {
    const token = await Token.createMint(
      this.connection,
      accountKeypair,
      accountKeypair.publicKey,
      null,
      9, // Decimal places for the token
      TOKEN_PROGRAM_ID
    );

    const userTokenAccount = await token.getOrCreateAssociatedAccountInfo(accountKeypair.publicKey);
    await token.mintTo(userTokenAccount.address, accountKeypair, [], mintAmount);
    return { token, userTokenAccount };
  }

  async transferTokens(fromAccount, toPublicKey, token, amount) {
    const toAccount = await token.getOrCreateAssociatedAccountInfo(new PublicKey(toPublicKey));
    await token.transfer(fromAccount.address, toAccount.address, fromAccount, [], amount);
    return `Transferred ${amount} tokens to ${toPublicKey}`;
  }

  async burnTokens(account, token, amount) {
    const accountInfo = await token.getAccountInfo(account);
    await token.burn(accountInfo.address, account, [], amount);
    return `Burned ${amount} tokens from account`;
  }
}

module.exports = SPLToken;
