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
        * `portNumber` (number): for the exposed port number that the server will be locally hosted on.
        * `serverStartupTimeAllowed` (number: time in milliseconds): to overwrite the default 3 seconds of wait-time for the server to start. 

  5. **Show The GraphQL Schema**
      * Similarly to Activate, starts the GraphQL API if it is not already on
      * Sends an introspection query to your API to receive details on the schema
      * Parses through the response to render a GraphQL schema on the GraphQuill Output Channel
    <img width="800px" src="../gifs/printSchema.gif" alt="schema output gif"/>
---

## The *Under the Hood* Details
#### An in-depth look 🧐 at how the extension was designed.
  1. The config file
      * Allows the user to specify the server entry point, port number, and optionally the allowed time for the server to startup
      * If these values are changed, GraphQuill will need to be reset (deactivated and activated)
  2. GraphQuill checks if the server is on
      * A node child process is started and writes to a bash terminal to check if the port has successfully been opened.
      * If the server is off, GraphQuill starts it up and invokes a server-on listener.
  3. The server-on listener
      * Servers take a non-trivial amount of time to spin up, so we designed a server-on listener to notify us when it has started. This created a smoother user experience.
      * To achieve this we made a server-on listener function that returns a promise. Then using async/await, the thread of execution could be blocked until the server was on (or the allowed timeout was exceeded).
      * Under the hood, the server-on funciton starts another node child process that "writes" to the terminal 5 times per second. Each command is checking if the specified port has been opened on the user's machine.
      * When the child process returns that the port is exposed (or the default timeout has been reached) the promise resolves with a boolean indicating the status of the server.
  4. Parsing Queries
      * Once the server is started, all the queries typed into VS Code need to be parsed.
      * GraphQuill will check if the function definition is in the current file, if not it will use the node 'fs' package to add it to the top line of the file.
      * GraphQuill will also parse the entire file for the graphQuill keyword, and collect the entire query inside of the graphQuill parens.
      * There is a validation step to check that the parsed query has balanced parens. If this step fails, that query will not be sent to the API.
  5. Sending the Queries to the API
      * Finally, the API is sent all valid queries
      * A Promise.all is used to send all the queries at once and append the queries and responses in pairs to the GraphQuill Output Channel.
  6. Deactivating GraphQuill 😢
      * When the time comes to turn off your favorite new VS Code extension, it recalls if it initialized the server, or if the user already had it running.
      * If GraphQuill spun up the server, it will shut it down using another node child process, otherwise it leaves it alone.
      * It will also clear and hide the GraphQuill Output Channel.
  7. Toggling GraphQuill on/off
      * This feature was added to improve user experience, so they wouldn't have to switch between the Activate and Deactivate commands. It's the little things 🙂
      * This command just triggers the activate or deactivate command based on the current on/off status of GraphQuill.
  8. Outputting the GraphQL Schema
      * This feature was a compromise between not showing the user any information about their GraphQL schema, and full intellisense-like recommendations. The latter involved many changes to the code base that were not feasible during development such as understanding how VS Code hashes temporary (dirty) files, introspection schemas and recommendation/intellisense algorithms. 
      * The compromise we settled on was to print the entire GraphQL schema to the output channel.
      * In the exact same method as Activating GraphQuill, this command checks if the server is already running, if not it spins it up. 
      * Once the server is on, it sends a long introspection query to receive back a big-ass object with all the information about the GraphQL schema.
      * We built iterative function that parses through that object to create a condensed GraphQL schema that appends to the GraphQuill Output Channel (gif above in [Explainations of Each Command #5](##Explainations-for-each-Command) )