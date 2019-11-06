/**
 * @author : Alex Chao
 * @function : return the entryPoint path in a string
 * @param : none
 * @returns : a string with a path to the entry point
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const path = require('path');
const fs = require('fs');

function findEntryPoint() {
  // identify entryPoint for the file that starts the server
  // search for root directory by finding the package.json file
  let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
  while (!fs.existsSync(`${root}/package.json`)) {
    root = path.dirname(root);
  }

  // find config file in root directory
  const gqConfigFilePath = `${root}/graphquill.config.json`;

  let entryPoint : string;
  if (fs.existsSync(gqConfigFilePath)) {
    entryPoint = `${root + JSON.parse(fs.readFileSync(gqConfigFilePath, 'utf8')).entry}`;
  } else {
    // default it to the current open editor if there is not a config file
    entryPoint = vscode.window.activeTextEditor!.document.fileName;

    // notify user that config file was not found and current file is being used as the entry point
    vscode.window.showInformationMessage(`graphquill.config.json file was not found. ${entryPoint} is being used as the server starting file`);
  }

  return entryPoint;
}

module.exports = findEntryPoint;
