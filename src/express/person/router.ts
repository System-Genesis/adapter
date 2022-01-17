import { Router } from 'express';
import { wrapController } from '../../utils/express';
import PersonController from './controller';

const persons: Router = Router();

// persons.use('/', AuthMiddleware.verifyToken, PermissionMiddleware.hasBasicPermission);

persons.get('/', wrapController(PersonController.getAll));

persons.get('/search', wrapController(PersonController.search));

persons.get('/:id', wrapController(PersonController.getByID));

persons.get('/getUpdated/:from', wrapController(PersonController.getAll));

persons.get('/identifier/:identityValue', wrapController(PersonController.getByIdentifier));

persons.get('/personalNumber/:personalNumber', wrapController(PersonController.getByIdentifier));

persons.get('/identityCard/:identityCard', wrapController(PersonController.getByIdentifier));

persons.get('/:identifier/pictures/profile', wrapController(PersonController.getPicture));

persons.get('/domainUser/:domainUser', wrapController(PersonController.getByDomainUser));

export default persons;
