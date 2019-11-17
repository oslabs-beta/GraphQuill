# GraphQuill Documentation **In Progress**

## Setting up the graphquill.config.js file:
  1. Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated. 
  2. Change the `entryPoint` value to the relative path from your project's root directory, to your server file. (The default config file will set this value to './server/index.js')
  3. Change the `portNumber` variable to the port that your server will be running on (The default config file will set this value to 3000).
  4. If your server takes particuarlly long to start up, increase the `serverStartupTimeAllowed` variable to a time in milliseconds. GraphQuill will wait that many milliseconds for your server to start before throwing an error.

## Advanced Use
  (in progress)

---
## VS Code Extension Commands
  1. GraphQuill: Activate
  2. GraphQuill: Deactivate
  3. GraphQuill: Toggle (Start/Stop)
  4. GraphQuill: Create Config File
  5. GraphQuill: Show The GraphQL Schema

## Explainations for each Extension Command
  1. 
  5. 
    
<img width="600px" src="./printSchema.gif"/>