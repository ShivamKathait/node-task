import http from 'http';
import express from 'express';
import cors from 'cors';
import connect_to_db from './common/connect_db';
import swaggerUi from 'swagger-ui-express';
import { appConfig } from './config/app.config';
import openapiDocs from '../output.openapi.json';
import userRoutes from './modules/users/user.routes';
import bookRoutes from './modules/books/books.routes';
import passport from './middlewares/passport.strategy';
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
// Uncomment when you have user routes
app.use('/user', userRoutes);
app.use('/books', bookRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocs, { customSiteTitle: 'Node API Documentation' }));

const port = appConfig.port;

let server: http.Server;

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);
}

(async () => {
  try {
    await connect_to_db();

    server = http.createServer(app);
    server.listen(port);

    server.on('error', onError);
    server.on('listening', onListening);

    console.log(`Server running at port ${port}...`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
