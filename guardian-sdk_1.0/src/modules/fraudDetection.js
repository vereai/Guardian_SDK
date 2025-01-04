
const tf = require('@tensorflow/tfjs-node');

class FraudDetection {
  constructor(modelPath) {
    this.model = null;
    this.loadModel(modelPath);
  }

  async loadModel(modelPath) {
    this.model = await tf.loadGraphModel(`file://${modelPath}`);
  }

  async detectFraud(transactionData) {
    const inputData = this.preprocessTransaction(transactionData);
    const result = await this.model.predict(inputData);
    const isFraudulent = this.postprocessResults(result);
    return isFraudulent;
  }

  preprocessTransaction(transactionData) {
    return tf.tensor([[
      transactionData.amount, 
      transactionData.count, 
      transactionData.timeframe
    ]]);
  }

  postprocessResults(modelOutput) {
    const output = modelOutput.arraySync();
    return output[0][0] > 0.5 ? 'Fraud detected' : 'No fraud detected';
  }

  async monitorTransactions(transactionData) {
    return await this.detectFraud(transactionData);
  }
}

module.exports = FraudDetection;
