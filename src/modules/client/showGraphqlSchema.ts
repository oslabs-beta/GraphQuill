/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';

const fetch = require('node-fetch');

function schemaToStringQueryAndMutation(schemaPiece: any) {
  let queriesStr = '';
  schemaPiece[0].fields.forEach((one: any) => {
    queriesStr += `${one.name} (`;

    one.args.forEach((e: any) => {
      // console.log(e);
      queriesStr += `\n  ${e.name}: `;
      let point = e.type;
      let nonNull = false;
      while (point.ofType) {
        if (point.kind === 'NON_NULL') nonNull = true;
        point = point.ofType;
      }
      // add exclaimation point for non-null args
      queriesStr += `${point.name}${nonNull ? '!' : ''}, `;
    });

    // remove the last comma
    queriesStr = queriesStr.slice(0, queriesStr.length - 2);
    if (one.args.length) queriesStr += '\n  )';
    if (one.type.ofType.kind !== 'LIST') {
      queriesStr += `: ${one.type.ofType.name}${one.type.kind === 'NON_NULL' ? '!' : ''}\n`;
    } else {
      queriesStr += `: [${one.type.ofType.ofType.ofType.name}${one.type.ofType.ofType === 'NON_NULL' ? '!' : ''}]${one.type.kind === 'NON_NULL' ? '!' : ''}\n`;
    }
  });
  return queriesStr;
}

function schemaToStringTypes(types: any) {
  const ans: string[] = [];
  types.filter((type: any) => type.kind === 'OBJECT')
    .forEach((type: any, index: number) => {
      ans.push(`${type.name}\n  `);
      type.fields.forEach((field: any) => {
        ans[index] += `${field.name}: `;
        let pointer = field.type;
        let nonNull = false;
        while (pointer.ofType) {
          if (pointer.kind === 'NON_NULL') nonNull = true;
          pointer = pointer.ofType;
        }
        ans[index] += `${pointer.name}${nonNull ? '!' : ''},\n  `;
      });
    });
  return ans;
}

async function showGraphqlSchema(
  serverOnFromUser: boolean,
  serverTurnedOnByGraphQuill: boolean,
  gqChannel: vscode.OutputChannel,
  portNumber: number,
) {
  // if the server is on from either the user or graphquill, continue
  // send first query & setup on save listener
  if (serverOnFromUser || serverTurnedOnByGraphQuill) {
  // send that request ot get back the entire schema...
    const all = await fetch(`http://localhost:${portNumber}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
    // .then((json: Object) => json);
      .then((json: {data: {__schema: {types: Object[]}}}) => (
      // eslint-disable-next-line no-underscore-dangle
        json.data.__schema.types.filter((e: any) => ( // can't figure out this any...
          e.kind !== 'SCALAR'))
      ));

    // parse that shit
    // console.log(all);
    const queries = all.filter((e: {name: string}) => e.name === 'Query');
    const parsedQueries = schemaToStringQueryAndMutation(queries);
    gqChannel.append(`QUERIES:\n${parsedQueries}\n`);

    const mutations = all.filter((e: {name: string}) => e.name === 'Mutation');
    const parsedMutations = schemaToStringQueryAndMutation(mutations);
    gqChannel.append(`\nMUTATIONS:\n${parsedMutations}\n`);

    const types = all.filter((e: {name: string}) => e.name !== 'Mutation' && e.name !== 'Query' && e.name.slice(0, 2) !== '__');

    gqChannel.append('\nTYPES: \n');
    const parsedTypesArray = schemaToStringTypes(types);
    parsedTypesArray.forEach((oneType: string) => {
      gqChannel.append(`${oneType}\n`);
    });
  }
}

module.exports = showGraphqlSchema;
