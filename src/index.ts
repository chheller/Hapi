import { startServer, configureServer } from './server';

process.on('unhandledRejection', (reason: string) => {
  console.error('Unhandled rejection');
  console.error(reason);
});

(async () => {
  const server = await configureServer();
  await startServer(server);
})();
