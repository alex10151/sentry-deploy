const path = require("path");

module.exports = {
  entry: "./install.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "sentry-fe-v0.0.1.bundle.js",
  },
  target: "node",
};
