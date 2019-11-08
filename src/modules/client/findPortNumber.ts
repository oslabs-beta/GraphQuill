/**
 * @author : Alex Chao
 * @function : return the portNumber as a string
 * @param: entryPoint
 * @returns: portNumber as a string
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

const fs = require('fs');

function findPortNumber(entryPoint: string) {
  // this is a blocking (synchronous) call to the active file, populating 'data' as a string
  const data = fs.readFileSync(entryPoint, 'utf8');

  // to stop a localhost, we must first identify a port, and 'app.listen(' is
  // a special string in the active file that is likely to be adjacent to the port number
  const lookup = data.search(/app.listen\(/);

  // this next segment is edge case handling for if the port number
  // is separated from the start parentheses by some number of spaces
  let displace = 0;
  while (data[lookup + displace + 11] === ' ') {
    displace += 1;
  }

  // return the port number (accounting for the offsetting per the edge case)
  return data.slice(lookup + 11 + displace, lookup + 15 + displace);
}

module.exports = findPortNumber;
