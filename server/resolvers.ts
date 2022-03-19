import {
  UserMutation,
  UserQuery
} from './services/user/resolver'

import {
  ProgressMutation,
  ProgressQuery
} from './services/progress/resolver'


const Mutation = {
  ...UserMutation,
  ...ProgressMutation
}
const Query = {
  ...UserQuery,
  ...ProgressQuery
}

export {
  Mutation,
  Query
}
