import { Server, ServerOptions } from '@hapi/hapi';
import * as Vision from '@hapi/vision';
import * as Inert from '@hapi/inert';
import * as HapiSwagger from 'hapi-swagger';
import * as Good from '@hapi/good';
import env from '../environment';
import routes from '../routes';

const {
  app: { host, port, protocol }
} = env;

export const configureServer = async () => {
  const config: ServerOptions = {
    port,
    host
  };
  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: { title: 'Test Api Documentation', version: '1.0.0' }
  };

  const server = new Server(config);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: Good,
      options: {
        reporters: {
          ConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*', error: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      }
    }
  ]);
  server.route(routes);
  return server;
};

export const startServer = async (server: Server) => {
  await server.start();
  console.log(`Server started at ${protocol}://${host}:${port}`);
};
