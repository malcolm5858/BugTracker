import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { redis } from "./redis";
import { LoginResolver } from "./modules/user/Login";
require("dotenv-safe").config();

const SESSION_SECRET = process.env.SESSION_SECRET;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: `http://localhost:${process.env.PORT}`,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "qid",
      secret: SESSION_SECRET || "",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
  });
};

main();
