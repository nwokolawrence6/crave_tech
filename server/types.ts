import {gql} from 'apollo-server-micro'
import UserSchema from './services/user/types'
import ProgressSchema from './services/progress/types'
import {typeDefs} from 'graphql-scalars'

const linkSchemas = gql`
    type Mutation {
        _: Boolean
    }

    type Query {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`

export default [linkSchemas, UserSchema,ProgressSchema, ...typeDefs]
