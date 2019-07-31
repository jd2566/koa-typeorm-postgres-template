import Koa from 'koa';
import cors from '@koa/cors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';

import winston from 'winston';
import 'reflect-metadata';
import {createConnection} from 'typeorm';

import {logger} from './configs/logging';
import {config} from './configs/config';
import {unprotectedRouter} from './configs/unprotectedRoutes';
import {protectedRouter} from './configs/protectedRoutes';

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection()
    .then(async (connection) => {
      const app = new Koa();

      // Provides important security headers to make your app more secure
      app.use(helmet());

      // Enable cors with default options
      app.use(cors());

      // Logger middleware -> use winston as logger (logging.ts with config)
      app.use(logger(winston));

      // Enable bodyParser with default options
      app.use(bodyParser());

      // these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
      app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

      // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
      // do not protect swagger-json and swagger-html endpoints
      app.use(jwt({secret: config.jwtSecret}));

      // these routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
      app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

      app.listen(config.port);

      console.log(`Server running on port ${config.port}`);
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
