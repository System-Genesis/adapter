import * as http from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { once } from 'events';
import { errorMiddleware } from './error';
import appRouter from './router';
import { authMiddleware, queryInsensitive, stringToArray } from './middleware';
import config from '../config';

class Server {
    private app: express.Application;

    private http: http.Server;

    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
    }

    static createExpressApp() {
        const app = express();

        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(stringToArray);
        app.use(queryInsensitive);
        app.use(logger('dev'));
        app.use((req, res, next) => {
            res.locals.token = req.headers.authorization || '';
            next();
        });
        if (config.authRequired) app.use(authMiddleware);
        app.use(appRouter);
        app.use(errorMiddleware);

        return app;
    }

    async start() {
        this.http = this.app.listen(this.port);
        await once(this.http, 'listening');
    }
}

export default Server;
