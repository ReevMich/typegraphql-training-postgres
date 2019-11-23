import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";
import { Context } from "./types/Context";

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [__dirname+'/modules/**/*.ts']
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: Context) => ({ 
            req, res
        }) // every request made gets Context
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    const corsData = cors({
        credentials: true,
        origin: "http://localhost:3000"
    });

    // Build our cookie session
    const sessionData = session({
        store: new RedisStore({
            client: redis as any
        }),
        name: "qid",
        secret: "aslkdfjoiq12312",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
        }
    });

    app.use(corsData, sessionData);

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();