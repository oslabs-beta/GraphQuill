/**
 * @author : Alex Chao
 * @function : return the entryPoint path in a string
 * @param : none
 * @returns : an array with the root directory AND the entryPoint strings
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

// const path = require('path');
const fs = require('fs');

function findEntryPoint(rootPath: string) {
  // find config file in root directory
  const gqConfigFilePath = `${rootPath}/graphquill.config.js`;

  let entryPoint : string;
  if (fs.existsSync(gqConfigFilePath)) {
    entryPoint = `${rootPath + JSON.parse(fs.readFileSync(gqConfigFilePath, 'utf8')).entry}`;
  } else {
    // default it to the current open editor if there is not a config file
    entryPoint = vscode.window.activeTextEditor!.document.fileName;

    // notify user that config file was not found and current file is being used as the entry point
    vscode.window.showInformationMessage(`graphquill.config.js file was not found. ${entryPoint} is being used as the server starting file`);
  }

  // return the array with the two results, to be destrucutred when the function is invoked
  return entryPoint;
}

module.exports = findEntryPoint;
