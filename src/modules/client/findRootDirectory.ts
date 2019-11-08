/**
 * @author : Alex Chao
 * @function : return the root directory path in a string
 * @param : none
 * @returns : string of the root directory
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */


// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const path = require('path');
const fs = require('fs');

function findRootDirectory() {
  // identify entryPoint for the file that starts the server
  // search for root directory by finding the package.json file
  let root = path.dirname(vscode.window.activeTextEditor!.document.fileName);
  while (!fs.existsSync(`${root}/package.json`)) {
    root = path.dirname(root);
  }

  return root;
}

module.exports = findRootDirectory;
