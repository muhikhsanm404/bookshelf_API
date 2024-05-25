import Hapi from '@hapi/hapi';
import environments from './config/environments.js';
import BooksController from './books/books.controller.js';

const init = async () => {
  try {
    const server = Hapi.server({
      host: environments.HOST,
      port: environments.PORT,
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });

    server.route(BooksController);

    server.route({
      method: 'GET',
      path: '/author',
      handler: (request, h) => {
        return h.response({ status: 'success', author: 'Muhammad Ikhsan Mandirri' }).code(200);
      },
    });

    server.route({
      method: '*',
      path: '/{any*}',
      handler: (request, h) => {
        return h.response({ status: 'fail', message: 'Not Found' }).code(404);
      },
    });

    await server.start();
    console.log(`[SERVER] running on ${server.info.uri}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise rejection:', err);
  process.exit(1);
});

init();
