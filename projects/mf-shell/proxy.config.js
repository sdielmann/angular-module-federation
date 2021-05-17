module.exports = {
  "/mf1": {
    target: "http://localhost:4300",
    pathRewrite: {
      "^/mf1/manifest$" : "/manifest.json",
      "^/mf1(/.*\.js(\.map)?)$" : "$1"
    }
  }
};
