import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { createSchema } from "./utils/createSchema";
import http from "http";
import { startPostgresqlConnection } from "./db/postgresql";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import ServerUtils from "./utils/server-utils";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const main = async () => {
  const schema = await createSchema();

  await startPostgresqlConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
    }),
    subscriptions: {
      onConnect: () => console.log("Connected to websocket"),
    },
  });

  const app = Express();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(cors(ServerUtils.corsOptions));

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (_req, res) {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(process.env.PORT || 4001, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => console.error(err));
