import {gql} from 'apollo-server-micro'

const ProgressTypes = gql`
    extend type Mutation {
        addCompany(data: addCompanyInput): String!
        createProgressStep(data: createProgressStepInput): String!
        checkCompletedStep(step:ObjectID stage: ObjectID): String!
    }
    extend type Query {
        getAllCompany(page: Int!): companyListPagination!
        getAllProgress(companyId: ObjectID!): [progress]!
    }
    input addCompanyInput {
        name: String!
        address: String!
    }
    input createProgressStepInput {
        companyId: ObjectID
        stage: String!
        steps: [String!]
    }
    type company {
        _id: ObjectID
        name: String!
        address: String!
        createdAt: Date!
        updatedAt: DateTime!
    }
    type companyListPagination {
        docs: [company]
        totalDocs: Int
        hasPrevPage: Boolean
        hasNextPage: Boolean
        page: Int
        limit: Int
        totalPages: Int
        pagingCounter: Int
    }
    enum status {
        pending
        completed
    }
    type steps {
        _id:ObjectID
        name: String!
        status: status!
        createdAt: DateTime
    }
    type progress {
        _id: ObjectID
        stage: String!
        steps: [steps!]
        status: status
        isCompleted: Boolean
        createdAt: Date!
        updatedAt: DateTime!
    }
`

export default ProgressTypes
