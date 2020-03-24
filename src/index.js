const Login = require("./account/login");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env")
});

class Start {
  constructor() {
    this.start();
  }

  start() {
    Login.start();
  }
}

module.exports = new Start();
