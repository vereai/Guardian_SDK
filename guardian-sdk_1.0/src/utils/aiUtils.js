
// src/utils/aiUtils.js

/**
 * This file contains utility functions to preprocess and postprocess data for AI models.
 */

/**
 * Tokenizes a string into an array of integers representing character codes.
 * @param {string} text - The text to tokenize.
 * @returns {Array} - Array of character codes.
 */
function tokenize(text) {
  return Array.from(text).map(char => char.charCodeAt(0));
}

/**
 * Pads an array of tokens to a fixed length.
 * @param {Array} tokens - The array of tokens to pad.
 * @param {number} length - The desired length after padding.
 * @returns {Array} - Padded array of tokens.
 */
function pad(tokens, length = 500) {
  if (tokens.length < length) {
    return [...tokens, ...new Array(length - tokens.length).fill(0)];
  }
  return tokens.slice(0, length);
}

/**
 * Preprocesses text data to be used by AI models. This includes tokenization and padding.
 * @param {string} text - The text to preprocess.
 * @param {number} length - The desired length after padding.
 * @returns {Array} - Preprocessed tensor for AI model input.
 */
function preprocessTextForModel(text, length = 500) {
  const tokens = tokenize(text);
  const paddedTokens = pad(tokens, length);
  return paddedTokens;
}

/**
 * Postprocesses the output from an AI model.
 * @param {Array} modelOutput - The output from the model.
 * @returns {string} - The interpreted output (e.g., detected vulnerabilities, classification result).
 */
function postprocessModelOutput(modelOutput) {
  // Example: For contract auditing, return the first detected issue
  return modelOutput.length > 0 ? modelOutput[0] : 'No issues detected';
}

module.exports = {
  tokenize,
  pad,
  preprocessTextForModel,
  postprocessModelOutput,
};
