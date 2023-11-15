const path = require("path");

module.exports = {
  //...
  resolve: {
    alias: {
      __dirname: path.resolve(__dirname, ""),
    },
  },
};
