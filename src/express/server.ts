import * as http from 'http';
import * as express from 'express';
import { Request } from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import { once } from 'events';
import { errorMiddleware } from './error';
import appRouter from './router';
import { objectMap } from '../utils/functionHandler';
import { authMiddleware } from './auth';
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
        app.use((req: Request<unknown, unknown, unknown, object>, _, next) => {
            if (req.query && req.query instanceof Object)
                req.query = objectMap(req.query, (param) =>
                    typeof param === 'string' && param.includes(',') ? param.split(',').map((value) => value.trim()) : param,
                );
            next();
        });
        app.use((req: Request<unknown, unknown, unknown, object>, _, next) => {
            if (req.query && req.query instanceof Object)
                req.query = new Proxy(req.query, {
                    get: (target: Object, name: string) =>
                        target[Object.keys(target).find((key) => key.toLowerCase() === name.toLowerCase()) as string],
                });
            next();
        });
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
