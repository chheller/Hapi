import { Request, ServerRoute, RequestEventHandler } from '@hapi/hapi';
import Joi = require('@hapi/joi');

const handler: RequestEventHandler = async (request, event, tags) => {
  return { ok: 'OK!' };
};

export default <ServerRoute>{
  method: 'GET',
  path: '/health-check',
  options: {
    handler,
    tags: ['api'],
    log: {
      collect: true
    },
    description: 'Healthcheck',
    notes: 'Is a healthcheck',
    validate: {
      headers: { 'ocp-apim-subscription-key': Joi.string().required() }
    }
  }
};
