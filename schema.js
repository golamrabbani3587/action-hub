const { gql } = require('apollo-server');
const { GraphQLJSON, GraphQLLong } = require('graphql-scalars');

const typeDefs = gql`
  scalar Long
  scalar JSON

  type Action {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    params: JSON          # Field added to hold action parameters
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }
  
  type Trigger {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    functionString: String
    resourceTemplateId: ID
    resourceTemplate: ResourceTemplate
  }

  type Response {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    platforms: [ResponsePlatform]
  }

  type ResponsePlatform {
    integrationId: ID
    build: Int
    localeGroups: [ResponseLocaleGroup]
  }

  type ResponseLocaleGroup {
    localeGroupId: ID
    variations: [ResponseVariation]
  }

  type ResponseVariation {
    name: String!
    responses: JSON
  }

  type ResourceTemplate {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    schema: JSON
    integrationId: String
    functionString: String
    key: String
  }

  type NodeObject {
    _id: ID!
    createdAt: Long!
    updatedAt: Long
    name: String!
    description: String
    parents: [NodeObject]
    parentIds: [ID]
    root: Boolean
    trigger: Trigger
    triggerId: ID
    responses: [Response]
    responseIds: [ID]
    actions: [Action]
    actionIds: [ID]
    priority: Float
    compositeId: ID
    global: Boolean
    colour: String
    resourceTemplate: ResourceTemplate
  }

  type Query {
    node(nodeId: ID!): NodeObject
    action(actionId: ID!): Action       # Added query to fetch individual action
    trigger(triggerId: ID!): Trigger    # Added query to fetch individual trigger
    response(responseId: ID!): Response # Added query to fetch individual response
    resourceTemplate(resourceTemplateId: ID!): ResourceTemplate  # Added query to fetch resource template
  }
`;

module.exports = typeDefs;
