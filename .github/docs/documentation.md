# GraphQuill Documentation 

## Contents
  1. [Setting up a config file](##Setting-up-the-graphquill.config.js-file)
  1. [Writing GraphQuill Queries](##Writing-GraphQuill-Queries)
  1. [List of VS Code Extension Commands](##VS-Code-Extension-Commands)
  1. [Explainations of Each Command](##Explainations-for-each-Command)
  1. [Under the Hood of GraphQuill](##The-*under-the-hood*-Details)
---
---

## Setting up the graphquill.config.js file
  1. Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated in your project's root directory. 
  2. Change the `entryPoint` value to the relative path from your project's root directory, to your server file. (The default config file will set this value to './server/index.js')
  3. Change the `portNumber` variable to the port that your server will be running on (The default config file will set this value to 3000).
  4. If your server takes particularly long to start up, increase the `serverStartupTimeAllowed` variable to a time in milliseconds (The built in default is 3 seconds). GraphQuill will wait that many milliseconds for your server to start before throwing an error.
---

## Writing GraphQuill Queries
  1. When activated and on every save, GraphQuill will ensure that there is a `graphQuill` function definition in the active file.
  2. Write a query as a string, as the argument to a graphQuill invocation.
      ```javascript
      graphQuill(`customer(id: 26) { firstName address { city state } }`)
      ```
  3. Hit save and GraphQuill will show the response in the Output Channel!
  4. To send *multiple queries* to your API at once, add a new invocation of `graphQuill` for each query.
---

## VS Code Extension Commands
  1. GraphQuill: Activate
  2. GraphQuill: Deactivate
  3. GraphQuill: Toggle (Start/Stop)
  4. GraphQuill: Create Config File
  5. GraphQuill: Show The GraphQL Schema

## Explainations for each Command
  1. **Activate**:
      * Checks if the GraphQL server is running on the port specified in the config file.
      * Starts the server if it is not already running.
      * On initial GraphQuill activation AND on every save within vscode:
        * GraphQuill will search for the graphQuill function definition in each file, and inject it (`function graphQuill() {}`) if it is not found.
        * Parse the active (or saved) file for every invocation of graphQuill and any query passed into the function.
        * Send the queries to your GraphQL API.
        * Render the queries and responses in the GraphQuill output channel.

  2. **Deactivate**: 
      * Will clear and hide the GraphQuill Output Channel
      * Closes the server/port if GraphQuill turned on the server in the Activate command (will not turn off the server if the user has started the server separately from GraphQuill).

  3. **Toggle (Start/Stop)**
      * Fires off the Activate or Deactivate command based on the current status of GraphQuill.

  4. **Create Config File** 
      * Searches for the root directory of your project by recursively searching for a `package.json` file.
      * Creates a `graphquill.config.js` file at the root directory.
      * The generated config file will have default values for: 
        * `entryPoint` (string): for the relative path to the server file
        * `portNumber` (number): for the port number that the server will be locally hosted on.
        * `serverStartupTimeAllowed` (number: time in milliseconds): to overwrite the default 3 seconds of wait-time for the server to start. 

  5. **Show The GraphQL Schema**
      * Similarly to Activate, starts the GraphQL API if it is not already on
      * Sends an introspection query to your API to receive details on the schema
      * Parses through the response to render a GraphQL schema on the GraphQuill Output Channel
    <img width="600px" src="../gifs/printSchema.gif" alt="schema output gif"/>
---

## The *Under the Hood* Details
#### An in-depth look at how the extension was designed.
  1. The config file
      * Allows the user to specify the server entry point, port number, and optionally the allowed time for the server to startup
      * If these values are changed, GraphQuill will need to be reset (deactivated and activated)
  2. GraphQuill checks if the server is on
      * A node child process is started and writes to a bash terminal to check if the port has successfully been opened.