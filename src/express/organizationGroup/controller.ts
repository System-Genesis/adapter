/* eslint-disable no-plusplus */
import { Request, Response } from 'express';
import NewKartoffel from '../../http/newKartoffel';
import { EntityDTO, GroupDTO } from '../../interfaces/newKartoffel';
import {
    akaUnit,
    childrenUnderGroupQuery,
    GetAllGroupsParams,
    populatePerson,
    SearchGroupsParams,
    underGroupId,
    updatedFrom,
} from '../../interfaces/types';
import { convertEntityToPerson, convertGroupToOrganizationGroup } from '../../utils/convertNewToOldKartoffel';
import { removeEmptyValues } from '../../utils/functionHandler';

export default class GroupController {
    static async getByID(req: Request<{ id: string }, unknown, unknown, { populate: populatePerson[] | populatePerson }>, res: Response) {
        const populate: string[] = Array.isArray(req.query.populate) ? req.query.populate : [req.query.populate];
        const group: GroupDTO = await NewKartoffel.getGroupById(req.params.id, populate.includes('children'), res.locals.token);
        if (populate.includes('directMembers')) group.directEntities = await NewKartoffel.getPersonsUnderGroup(req.params.id, true, res.locals.token);
        if (populate.includes('ancestors')) {
            group.ancestors = (
                await Promise.allSettled(group.ancestors.map((ancestor) => NewKartoffel.getGroupById(ancestor, false, res.locals.token)))
            ).reduce((acc: GroupDTO[], ancestor): GroupDTO[] => {
                if (ancestor.status === 'fulfilled') {
                    acc.push(ancestor.value);
                }
                return acc;
            }, []);
        }

        res.json(convertGroupToOrganizationGroup(group));
    }

    static async getAll(req: Request<akaUnit & updatedFrom, unknown, unknown, unknown>, res: Response) {
        const groupParams: GetAllGroupsParams = removeEmptyValues({
            updatedFrom: req.params.from,
            akaUnit: req.params.akaUnit,
        });
        const groups: GroupDTO[] = await NewKartoffel.getGroups(groupParams, res.locals.token);
        res.json(groups.map((group) => convertGroupToOrganizationGroup(group)));
    }

    static async search(req: Request<underGroupId, unknown, unknown, SearchGroupsParams>, res: Response) {
        const searchParams: SearchGroupsParams = removeEmptyValues({
            name: req.query.name,
            hierarchy: req.query.hierarchy,
            underGroupId: req.params.id,
            nameAndHierarchy: req.query.nameAndHierarchy,
            status: req.query.status,
        });
        const groups: GroupDTO[] = await NewKartoffel.searchGroups(searchParams, res.locals.token);
        res.json(groups.map((group) => convertGroupToOrganizationGroup(group)));
    }

    static async getByPath(req: Request, res: Response) {
        const group: GroupDTO = await NewKartoffel.getGroupByHierarchy(req.params.path, res.locals.token);
        res.json(convertGroupToOrganizationGroup(group));
    }

    static async getPersonsUnderGroup(req: Request, res: Response) {
        const persons: EntityDTO[] = await NewKartoffel.getPersonsUnderGroup(req.params.id, false, res.locals.token);
        res.json(persons.map((person) => convertEntityToPerson(person)));
    }

    static async getGroupsChildren(req: Request<{ id: string }, unknown, unknown, childrenUnderGroupQuery>, res: Response) {
        const direct = req.query.maxDepth === '1';
        const groups: GroupDTO[] = await NewKartoffel.getChildrenUnderGroup(req.params.id, direct, res.locals.token);
        res.json(groups.map((group) => convertGroupToOrganizationGroup(group)));
    }

    static async checkPathExists(req: Request, res: Response) {
        res.json(await NewKartoffel.checkPathExists(req.params.path, res.locals.token));
    }
}
