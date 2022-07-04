import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './app/config/router';
import path from 'path';
import connection from './app/config/database';
import log from './app/helpers/log';
import { Prisma } from '@prisma/client';

(() => {
  dotenv.config();
  const app = express();
  const PORT: undefined | string | number = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static(path.join(__dirname, '../public')));
  app.use(routes);

  app.listen(PORT, async () => {
    try {
      await connection.$connect();
      console.log(`database connected`);
      connection.$on('query', (event: Prisma.QueryEvent) => {
        log.query.setLog({ log: event.query, type: 'info' });
      });
      log.server.setLog({ log: `database connected`, type: 'info' });
    } catch (error) {
      console.log(error);
      log.server.setLog({
        log: 'doesnt have any database connection',
        type: 'error',
      });
      await connection.$disconnect();
    }

    log.server.setLog({ log: `server running on port ${PORT}`, type: 'info' });
    console.log(`server running on port ${PORT}`);
  });
  log.query.getLog();
  log.server.getLog();
})();
