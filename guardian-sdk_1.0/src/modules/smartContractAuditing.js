
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const path = require('path');

class SmartContractAuditing {
  constructor(modelPath) {
    this.model = null;
    this.loadModel(modelPath);
  }

  async loadModel(modelPath) {
    this.model = await tf.loadGraphModel(`file://${modelPath}`);
  }

  async auditContract(contractCode) {
    const inputData = this.preprocessContract(contractCode);
    const result = await this.model.predict(inputData);
    const issues = this.postprocessResults(result);
    return issues;
  }

  preprocessContract(contractCode) {
    const tokens = this.tokenize(contractCode);
    const paddedTokens = this.pad(tokens);
    return tf.tensor(paddedTokens);
  }

  postprocessResults(modelOutput) {
    const output = modelOutput.arraySync();
    return this.mapToVulnerabilities(output);
  }

  tokenize(code) {
    return Array.from(code).map(c => c.charCodeAt(0));
  }

  pad(tokens) {
    return tokens.length < 500 ? [...tokens, ...new Array(500 - tokens.length).fill(0)] : tokens.slice(0, 500);
  }

  mapToVulnerabilities(output) {
    return output[0] > 0.5 ? ['Reentrancy vulnerability detected'] : ['No vulnerabilities found'];
  }

  async runAudit(contractPath) {
    const contractCode = fs.readFileSync(contractPath, 'utf8');
    const issues = await this.auditContract(contractCode);
    return issues;
  }
}

module.exports = SmartContractAuditing;
