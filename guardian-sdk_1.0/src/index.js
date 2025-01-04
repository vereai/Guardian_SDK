
const Solana = require('./modules/solana');
const SPLToken = require('./modules/splToken');
const Logger = require('./utils/logger');

(async () => {
  try {
    const solana = new Solana('devnet');
    const solanaAccount = await solana.createAccount();
    Logger.log(`Solana Account created: ${solanaAccount.publicKey.toString()}`);

    const splToken = new SPLToken(solana.connection);
    const { token, userTokenAccount } = await splToken.createToken(solanaAccount);
    Logger.log(`Created SPL Token with address: ${token.publicKey.toString()}`);
    
    // Further SDK logic here
    
  } catch (err) {
    Logger.error(`Error: ${err.message}`);
  }
})();
