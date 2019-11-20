module.exports = {
  // change "./server/index.js" to the relative path from the root directory to
  // the file that starts your server
  entry: './server/index.js',

  // change 3000 to the port number that your server runs on
  portNumber: '3000',

  // to increase the amount of time allowed for the server to startup, add a time
  // in milliseconds (integer) to the "serverStartupTimeAllowed"
  serverStartupTimeAllowed: 5000,
};