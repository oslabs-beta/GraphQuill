<p align="center">
  <img width="250px" src="./DOCUMENTATION/graphquill-logo.png" />
</p>

# GraphQuill

## What is GraphQuill?
  GraphQuill is a VS Code extension that performs GraphQL API endpoint testing within the VS Code environment. GraphQuill intends to remove the need for switching between VS Code and GraphiQL, Postman, or another API development tool.

## Features
### **Core Features**
  1. Starts your GraphQL server (if it is not already running). 
    
    NOTE: GraphQuill is compatible with local and dockerized servers and will check if the specified port has a running server on it.
    GraphQuill is also compatible with **external** API's (accessed via a url in the config file).
  2. Parses GraphQL queries/mutations that are typed into the current open document in VS Code.
  3. Sends the queries/mutations to the GraphQL API.
  4. Renders the responses to the GraphQuill output channel on VS Code.
  
  <img width="800px" src="./DOCUMENTATION/gifs/basicDemo.gif" alt="demo gif" />

### **Additional Features**
  * Output the current schema of your GraphQL API in the GraphQuill output channel.
  * A GraphQL API that was used during GraphQuill's development has been open sourced in two repositories on Github to allow users to give GraphQuill a test drive. Below are two repositories, one that has been dockerized, and one that uses locally hosted PostgreSQL and MongoDB databases.
  * [The dockerized version is here](https://github.com/GraphQuill/Mock-GraphQL-API-Docker). 
  * [The locally hosted PostgreSQL and MongoDB databases version is here](https://github.com/GraphQuill/Mock-GraphQL-API-Local).

___

## Getting Started

### **Installation**
GraphQuill can be installed from the VS Code Extensions marketplace [here](https://marketplace.visualstudio.com/items?itemName=sproutdeveloping.graphquill).

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated. If you're using a **locally-hosted server**, update the entry point with your server's file path and add a port number. If you're using an **external server**, set the entrypoint to its URL. For more details, refer to the [documentation](./DOCUMENTATION/docs/documentation.md).

### GraphQuill's Mock GraphQL API
A GraphQL API that was used during GraphQuill's development has been open sourced in two repositories on Github to allow users to give GraphQuill a test drive. Below are two repositories, one that has been dockerized, and one that uses locally hosted PostgreSQL and MongoDB databases.

[The dockerized version is here](https://github.com/GraphQuill/Mock-GraphQL-API-Docker). 

[The locally hosted PostgreSQL and MongoDB databases version is here](https://github.com/GraphQuill/Mock-GraphQL-API-Local).

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
We are always looking to improve. If there are any contributions, feature requests or issues/bugs you have, please check out our documentation on [contributions](./DOCUMENTATION/docs/contributing.md), [feature requests](./DOCUMENTATION/docs/featureRequest.md) or [issues/bugs](./DOCUMENTATION/docs/bugReport.md).

## Release Notes
Created by: Alex Chao, Austin Ruby and Edward Greenberg

0.16.0 | Initial release of GraphQuill, More to come! 
