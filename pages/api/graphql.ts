import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dataSources from '../../server/datasource'
import DateBase from "../../server/db";
import { typeDefs, resolvers } from '../../server/schema'
import {MONGO_URL} from "../../server/tools/config";
import * as cookies from 'cookies-next'
import IncludeUser from '../../server/helper/IncludeUser'
import ILoggedIn from "../../server/interfaces/AuthInterface";
import formatError from "../../server/helper/formatError";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
      dataSources: dataSources,
      engine: {
        reportSchema: true,
      }
    }
  },
  formatError,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req:NextApiRequest & { user: ILoggedIn }, res:NextApiResponse) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await new DateBase().connect(MONGO_URL as string)
  await startServer;
  (res as any).cookie = cookies
  await IncludeUser(req,res)
  await apolloServer.createHandler({path: "/api/graphql"})(req, res);
}

export const config = {
  api: {
    bodyParser: false
  }
};
