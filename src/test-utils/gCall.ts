import { graphql, GraphQLSchema } from "graphql"
import { createSchema } from "../utils/createSchema"
import Maybe from "graphql/tsutils/Maybe"

interface Options {
    source: string;
    variableValues?: Maybe<{ [key: string]: any }>;
    uid?: number;
}

let schema: GraphQLSchema;

export const testGraphQl = async ({ source, variableValues, uid }: Options) => {
    if (!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    uid
                }
            },
            resp: {
                clearCookie: jest.fn()
            }
        }
    })
}