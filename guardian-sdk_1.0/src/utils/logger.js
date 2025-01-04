
class Logger {
  static log(message) {
    console.log(`[INFO]: ${message}`);
  }

  static error(message) {
    console.error(`[ERROR]: ${message}`);
  }

  static warn(message) {
    console.warn(`[WARN]: ${message}`);
  }
}

module.exports = Logger;
