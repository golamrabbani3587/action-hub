const fs = require('fs');
const path = require('path');

const actionsData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/action.json'), 'utf8'));
const triggersData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/trigger.json'), 'utf8'));
const responsesData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/response.json'), 'utf8'));
const nodesData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/node.json'), 'utf8'));
const resourceTemplatesData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/resourceTemplate.json'), 'utf8'));

const resolvers = {
  Query: {
    node: (parent, args) => {
      const node = nodesData.find((node) => node._id === args.nodeId);
      if (!node) {
        throw new Error('Node not found');
      }
      return node;
    },
    action: (parent, args) => {
      const action = actionsData.find((action) => action._id === args.actionId);  // Fetch the action by ID
      if (!action) {
        throw new Error('Action not found');
      }
      return action;
    },
    trigger: (parent, args) => {
      const trigger = triggersData.find((trigger) => trigger._id === args.triggerId);
      if (!trigger) {
        throw new Error('Trigger not found');
      }
      return trigger;
    },
    response: (parent, args) => {
      const response = responsesData.find((response) => response._id === args.responseId);
      if (!response) {
        throw new Error('Response not found');
      }
      return response;
    },
    resourceTemplate: (parent, args) => {
      const resourceTemplate = resourceTemplatesData.find((template) => template._id === args.resourceTemplateId);
      if (!resourceTemplate) {
        throw new Error('Resource Template not found');
      }
      return resourceTemplate;
    }
  },
  NodeObject: {
    actions: (parent) => {
      return parent.actionIds ? parent.actionIds.map(actionId => {
        return actionsData.find(action => action._id === actionId);
      }) : [];
    },
    responses: (parent) => {
      return parent.responseIds ? parent.responseIds.map(responseId => {
        return responsesData.find(response => response._id === responseId);
      }) : [];
    },
    trigger: (parent) => {
      return parent.triggerId ? triggersData.find(trigger => trigger._id === parent.triggerId) : null;
    },
    resourceTemplate: (parent) => {
      return parent.resourceTemplateId ? resourceTemplatesData.find(template => template._id === parent.resourceTemplateId) : null;
    }
  },
  Action: {
    resourceTemplate: (parent) => {
      return parent.resourceTemplateId ? resourceTemplatesData.find(template => template._id === parent.resourceTemplateId) : null;
    }
  },
  Trigger: {
    resourceTemplate: (parent) => {
      return parent.resourceTemplateId ? resourceTemplatesData.find(template => template._id === parent.resourceTemplateId) : null;
    }
  }
};

module.exports = resolvers;
