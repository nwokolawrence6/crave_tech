import { Query, Mutation} from './resolvers'
import typeDefs from './types'
import { resolvers as resolve } from "graphql-scalars";

const resolvers = {
  Query,
  Mutation,
  ...resolve
}

export {
  typeDefs,
  resolvers
}
