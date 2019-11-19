<p align="center">
  <img width="250px" src="./.github/graphquill-logo.png" />
</p>

# GraphQuill

## What is GraphQuill?
  GraphQuill is a VS Code extension that performs GraphQL API endpoint testing within the VS Code environment. GraphQuill intends to remove the need for switching between VS Code and GraphiQL, Postman, or another API development tool.

## Features
### **Core Features**
  1. Starts your GraphQL server (if it is not already running).
  2. Parses GraphQL queries/mutations that are typed into the current open document in VS Code.
  3. Sends the queries/mutations to your GraphQL API.
  4. Renders the responses to the GraphQuill output channel on VS Code.
  
  <img width="800px" src="./.github/gifs/basicDemo.gif" alt="demo gif" />

### **Additional Features**
  * Output the current schema of your GraphQL API in the GraphQuill output channel.
___

## Getting Started

### **Installation**
GraphQuill can be installed from the VS Code Extensions marketplace [here](https://marketplace.visualstudio.com/items?itemName=sproutdeveloping.graphquill).

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated. Update the entry point and port number to finish your GraphQuill setup (for more details refer to the [documentation](./.github/docs/documentation.md)).

## Write your first GraphQuill query
Search for GraphQuill from the command palette in VS Code (Cmd/Ctrl + Shift + P) and run the **Activate** command. If the `graphQuill` function is not defined, GraphQuill will inject a function definition on the top line of your file.

Anywhere in your open file, put a GraphQL query inside the graphQuill function. For example: 
  ```javascript
    graphQuill(`{
      customer (customerId: 8) {
        firstName
        lastName
        email
      }  
    }`);

    graphQuill('{ product (productId: 26) { name description weight } }');
  ```
On every save, GraphQuill will send any requests inside of the `graphQuill` functions to your GraphQL API and show responses in the GraphQuill Output Channel. To send another request, create a new invocation of the `graphQuill` function and put the new request as the argument.

___

## Contributing and Issues
We are always looking to improve. If there are any contributions, feature requests or issues/bugs you have, please check out our documentation on [contributions](./.github/docs/contributing.md), [feature requests](./.github/docs/featureRequest.md) or [issues/bugs](./.github/docs/bugReport.md).

## Release Notes
Created by: Alex Chao, Austin Ruby and Edward Greenberg

0.12.0 | Initial release of GraphQuill, More to come! 
