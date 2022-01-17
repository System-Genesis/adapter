import { Router } from 'express';
import { wrapController } from '../../utils/express';
import GroupController from './controller';

// import { body, param, check, validationResult } from 'express-validator/check';

const organizationGroups = Router();

organizationGroups.get('/', wrapController(GroupController.getAll));

organizationGroups.get('/search', wrapController(GroupController.search));

organizationGroups.get('/:id', wrapController(GroupController.getByID));

organizationGroups.get('/:id/search', wrapController(GroupController.search));

organizationGroups.get('/getUpdated/:from', wrapController(GroupController.getAll));

organizationGroups.get('/path/:path', wrapController(GroupController.getByPath));

organizationGroups.get('/path/:path/hierarchyExistenceChecking', wrapController(GroupController.checkPathExists));

organizationGroups.get('/akaUnit/:akaUnit', wrapController(GroupController.getAll));

organizationGroups.get('/:id/members', wrapController(GroupController.getPersonsUnderGroup));

organizationGroups.get('/:id/children', wrapController(GroupController.getGroupsChildren));

export default organizationGroups;
