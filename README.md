# GraphQuill

## What is GraphQuill?
  GraphQuill is a VS Code extension that performs GraphQL API endpoint testing within the VS Code environment. GraphQuill intends to remove the need for switching between VS Cdoe and GraphiQL, Postman, or another API development tool.

## Features
### **Core Features**
  1. Starts your GraphQL server (if it is not already running).
  2. Parses GraphQL queries/mutations that are typed into the current open document in VS Code
  3. Sends the queries/mutations to the GraphQL API.
  4. Renders the responses to the GraphQuill output channel on VS Code.
### **Additional Features**
  * Output the current schema of your GraphQL API in the GraphQuill output channel.

  (gif/demo coming soon)

___

## Getting Started

### **Installation**
Graphquill can be installed from the VS Code Extensions marketplace [here](https://marketplace.visualstudio.com/items?itemName=sproutdeveloping.graphquill).

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"GraphQuill: Create GraphQuill Config File"`. A default config file will be generated. Update the entry point and port number to finish your GraphQuill setup (for more details refer to the [documentation](./publicDocs/DOCUMENTATION.md)).

## Write your first GraphQuill query

## Advanced Use
For additional features with less use cases, refer to the [documentation](./publicDocs/DOCUMENTATION.md).

___

## Contributing and Issues
We are always looking to improve. If there are any contributions or issues you have, please check out our documentation on [contributions](./publicDocs/CONTRIBUTIONS.md) or [issues](./publicDocs/ISSUES.md).

## Relase Notes
Created by: Alex Chao, Austin Ruby and Edward Greenburg
0.8.0 | Initial release of GraphQuill, More to come! 
