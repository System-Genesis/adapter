import { Router } from 'express';
import personRouter from './person/router';
import organizationGroupRouter from './organizationGroup/router';

const appRouter = Router();

appRouter.use('/api/persons', personRouter);
appRouter.use('/api/organizationGroups', organizationGroupRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
