<p align="center">
  <img width="250px" src="https://github.com/oslabs-beta/GraphQuill/raw/dev/publicDocs/graphquill-logo.png" />
</p>

# GraphQuill

## What is GraphQuill?
  GraphQuill is a VS Code extension that performs GraphQL API endpoint testing within the VS Code environment. GraphQuill intends to remove the need for switching between VS Code and GraphiQL, Postman, or another API development tool.

## Features
### **Core Features**
  1. Starts your GraphQL server (if it is not already running).
  2. Parses GraphQL queries/mutations that are typed into the current open document in VS Code
  3. Sends the queries/mutations to the GraphQL API.
  4. Renders the responses to the GraphQuill output channel on VS Code.
  
  <img width="600px" src="https://github.com/oslabs-beta/GraphQuill/blob/dev/publicDocs/basicDemo.gif" alt="demo gif" />

### **Additional Features**
  * Output the current schema of your GraphQL API in the GraphQuill output channel.


___

## Getting Started

### **Installation**
Graphquill can be installed from the VS Code Extensions marketplace [here](https://marketplace.visualstudio.com/items?itemName=sproutdeveloping.graphquill).

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated. Update the entry point and port number to finish your GraphQuill setup (for more details refer to the [documentation](./publicDocs/DOCUMENTATION.md)).

## Write your first GraphQuill query
Activate GraphQuill from the command palette in VS Code (Cmd/Ctrl + Shift + P). GraphQuill will inject a function definition on the top line of your file.
Anywhere in your open file, put a GraphQL query inside the graphQuill function. For example: 
  ```javascript
    graphQuill(`{
      customer (customerId: 8) {
        firstName
        lastName
        email
      }  
    }`);

    graphQuill(`{ product (productId: 26) { name description weight } }`);
  ```
On every save, GraphQuill will send any requests inside of the `graphQuill` function to your GraphQL API and show responses in the GraphQuill Output Channel. To send another request, create a new invokation of the `graphQuill` function and put the new request as the argument.


___

## Contributing and Issues
We are always looking to improve. If there are any contributions or issues you have, please check out our documentation on [contributions](./publicDocs/CONTRIBUTING.md) or [issues](./publicDocs/ISSUES.md).

## Relase Notes
Created by: Alex Chao, Austin Ruby and Edward Greenburg

0.10.0 | Initial release of GraphQuill, More to come! 
