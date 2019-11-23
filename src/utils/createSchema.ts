import { buildSchema } from "type-graphql";
import { UserResolvers } from "../modules/user/UserResolvers";

export const createSchema = () => buildSchema({
    resolvers: [
        ...UserResolvers
    ]
});