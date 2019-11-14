/* eslint-disable no-unused-vars */
// these rules are disabled for the weird require that is inside of the function
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

/**
 * @author : Alex Chao
 * @function : return an object with the entryPoint and the allowServerTimeoutConfigSetting
 * @param : none
 * @returns : an array with the root directory AND the entryPoint strings
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// const path = require('path');
const fs = require('fs');
const path = require('path');

function parseConfigFile(rootPath: string) {
  // find config file in root directory
  const gqConfigFilePath = `${rootPath}/graphquill.config.js`;

  // ! a cached version of this file will be stored here, so future invocations that are trying
  // to get results of an updated config file, will appear to not have been changed
  delete require.cache[gqConfigFilePath];

  let entryPoint : string;
  let allowServerTimeoutConfigSetting : number|undefined;
  let portNumber: number;

  if (fs.existsSync(gqConfigFilePath)) {
    // if the config file exists, require it in (will come in as an object)
    const configObject = require(`${gqConfigFilePath}`);
    console.log('config object in parseconfigfile.ts', configObject);

    // set the entry point to the absolute path (root + relative entry path)
    entryPoint = path.resolve(rootPath, configObject.entry);

    // set the portnumber
    portNumber = configObject.portNumber;

    // set the servertimeout config setting
    allowServerTimeoutConfigSetting = configObject.serverStartupTimeAllowed;
  } else {
    // if config file is not found, return an empty string,
    // error handle on the other side
    entryPoint = '';
    portNumber = 0;

    // * This will be handled in the outer extension.ts file to notify the user and break out of
    // * the thread of execution at the same time
    // notify user that config file was not found and current file is being used as the entry point
    // vscode.window.showInformationMessage('graphquill.config.js file was not found.
    // Please use the Create GraphQuill Config File Command to create one');
  }

  // return an object with the results, to be destrucutred when the function is invoked
  return { entryPoint, portNumber, allowServerTimeoutConfigSetting };
}

module.exports = parseConfigFile;
