/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fetch = require('node-fetch');

// funciton that handles parsing of queries and mutations
// these are slightly different than types because they have to parse arguments
// into the () parens
function schemaToStringQueryAndMutation(schemaPiece: any) {
  // queriesStr is the final string that will be returned
  let queriesStr = '';

  // the schema piece that is inputted will be only the QUERIES or MUTATIONS object
  // so select the first element, iterate through it's fields each individual query/mutation
  schemaPiece[0].fields.forEach((one: any) => {
    // start with an open paren
    queriesStr += `${one.name} (`;

    // then iterate through each argument (the values inside of the parens)
    one.args.forEach((e: any) => {
      // console.log(e);
      // add the arg name to the final string
      queriesStr += `\n  ${e.name}: `;

      // generate it's type and if it's a non-nullable add an exclaimation point
      let point = e.type;
      let nonNull = false;
      while (point.ofType) {
        if (point.kind === 'NON_NULL') nonNull = true;
        point = point.ofType;
      }

      // actually putting the value onto the final string
      queriesStr += `${point.name}${nonNull ? '!' : ''}, `;
    });

    // remove the last comma of the arguments, place a closing paren
    queriesStr = queriesStr.slice(0, queriesStr.length - 2);
    if (one.args.length) queriesStr += '\n  )';

    // place the returned type at the end of the answer string
    if (one.type.ofType.kind !== 'LIST') {
      // if it's not a list, just put the type on the end, and an ! if it's non-nullable
      queriesStr += `: ${one.type.ofType.name}${one.type.kind === 'NON_NULL' ? '!' : ''}\n`;
    } else {
      // similar for a list but extra check for non-nullable elements as well
      queriesStr += `: [${one.type.ofType.ofType.ofType.name}${one.type.ofType.ofType === 'NON_NULL' ? '!' : ''}]${one.type.kind === 'NON_NULL' ? '!' : ''}\n`;
    }
  });
  return queriesStr;
}

// function to return an array of strings that have each schema in it
function schemaToStringTypes(types: any) {
  // final answer object is an array of strings
  const ans: string[] = [];
  // filter out all of the massive input that have 'OBJECT' as their kind
  // there's a lot of other shit in here that will throw errors/can be ignored
  types.filter((type: any) => type.kind === 'OBJECT')
    .forEach((type: any, index: number) => {
    // for each of the types that we want to parse, start the answer string with the type name
      ans.push(`${type.name}\n  `);
      // iterate through the fields of the individual type
      type.fields.forEach((field: any) => {
        // insert field name
        ans[index] += `${field.name}: `;

        // handle non-nullables and the field type here
        let pointer = field.type;
        let nonNull = false; // to check if there is a non-nullable, this is not exhaustive...
        let isList = false; // to check if there is a list and [] need to be added
        while (pointer.ofType) {
          if (pointer.kind === 'LIST') isList = true;
          if (pointer.kind === 'NON_NULL') nonNull = true;
          pointer = pointer.ofType;
        }
        // set the result to the answer index
        ans[index] += `${isList ? '[' : ''}${pointer.name}${nonNull ? '!' : ''}${isList ? ']' : ''},\n  `;
      });
    });
  // return the entire array to be printed to the graphquill channel
  return ans;
}

// function to be exported
async function showGraphqlSchema(
  serverOnFromUser: boolean,
  serverTurnedOnByGraphQuill: boolean,
  gqChannel: vscode.OutputChannel,
  portNumber: number,
) {
  // if the server is on from either the user or graphquill, continue
  // send the __schema query & setup on save listener
  if (serverOnFromUser || serverTurnedOnByGraphQuill) {
  // send that request ot get back the entire schema...
    const all = await fetch(`http://localhost:${portNumber}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ // this beautiful string literal is the introspection query
        query: `query IntrospectionQuery {
          __schema {
            types {
              ...FullType
            }
          }
        }
        
        fragment FullType on __Type {
          kind
          name
          description
          fields(includeDeprecated: false) {
            name
            description
            args {
              ...InputValue
            }
            type {
              ...TypeRef
            }
          }
        }
        fragment InputValue on __InputValue {
          name
          description
          type { ...TypeRef }
          defaultValue
        }
        fragment TypeRef on __Type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      }),
    }).then((res: Response) => res.json())
      .then((json: {data: {__schema: {types: Object[]}}}) => (
      // eslint-disable-next-line no-underscore-dangle
        json.data.__schema.types.filter((e: any) => ( // can't figure out this any...
          e.kind !== 'SCALAR')) // filter out the scalar types ('BOOLEAN', 'STRING')
        // this will cause problems for graphql apis that have custom scalar types... but mvp :)
      ));

    // parse that shit
    // console.log(all);
    // filter out just the query type and send it to the schemaToStringQ&M function defined above
    const queries = all.filter((e: {name: string}) => e.name === 'Query');
    const parsedQueries = schemaToStringQueryAndMutation(queries);
    gqChannel.append(`QUERIES:\n${parsedQueries}\n`);

    // same thing for the mutations
    const mutations = all.filter((e: {name: string}) => e.name === 'Mutation');
    const parsedMutations = schemaToStringQueryAndMutation(mutations);
    gqChannel.append(`\nMUTATIONS:\n${parsedMutations}\n`);

    // almost the same thing for the types
    const types = all.filter((e: {name: string}) => e.name !== 'Mutation' && e.name !== 'Query' && e.name.slice(0, 2) !== '__');

    // channel header
    gqChannel.append('\nTYPES: \n');

    // returns an array of strings to append to channel
    const parsedTypesArray = schemaToStringTypes(types);

    // append the results of each type onto the graphquill channel
    parsedTypesArray.forEach((oneType: string) => {
      gqChannel.append(`${oneType}\n`);
    });
  }
}

// export that beauty
module.exports = showGraphqlSchema;
