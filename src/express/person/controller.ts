import { Request, Response } from 'express';
import NewKartoffel from '../../http/newKartoffel';
import { EntityDTO } from '../../interfaces/newKartoffel';
import { GetPersonsParams, SearchPersonsParams, updatedFrom } from '../../interfaces/types';
import { convertEntityToPerson } from '../../utils/convertNewToOldKartoffel';
import { removeEmptyValues } from '../../utils/functionHandler';

export default class PersonController {
    static async getByID(req: Request, res: Response) {
        const person: EntityDTO = await NewKartoffel.getPersonById(req.params.id, res.locals.token);
        res.json(convertEntityToPerson(person));
    }

    // TODO: GetPersonsParams keys are supposed to be arrays because you have middleware that splits?
    static async getAll(req: Request<updatedFrom, unknown, unknown, GetPersonsParams>, res: Response) {
        const personParams: GetPersonsParams = removeEmptyValues({
            entityType: req.query.entityType,
            rank: req.query.rank,
            updatedFrom: req.params.from,
            'digitalIdentity.source': req.query['domainUsers.dataSource'],
        });
        const persons: EntityDTO[] = await NewKartoffel.getPersons(personParams, res.locals.token);
        // TODO: Generic Response handler.
        res.json(persons.map((person) => convertEntityToPerson(person)));
    }

    static async search(req: Request<unknown, unknown, unknown, SearchPersonsParams>, res: Response) {
        const searchParams: SearchPersonsParams = removeEmptyValues({
            fullName: req.query.fullName,
            entityType: req.query.entityType,
            rank: req.query.rank,
            underGroupId: req.query.underGroupId,
            'digitalIdentity.source': req.query['domainUsers.dataSource'],
        });
        const persons: EntityDTO[] = await NewKartoffel.searchPersons(searchParams, res.locals.token);
        res.json(persons.map((person) => convertEntityToPerson(person)));
    }

    static async getByIdentifier(req: Request, res: Response) {
        const identifier = req.params.personalNumber || req.params.identityCard || req.params.identityValue;
        const person: EntityDTO = await NewKartoffel.getPersonByIdentifier(identifier, res.locals.token);
        res.json(convertEntityToPerson(person));
    }

    static async getPicture(req: Request, res: Response) {
        const picStream = await NewKartoffel.getPicture(req.params.identifier, res.locals.token);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        picStream.data.pipe(res);
    }

    static async getByDomainUser(req: Request, res: Response) {
        const person: EntityDTO = await NewKartoffel.getPersonByIDomainUser(req.params.domainUser, res.locals.token);
        res.json(convertEntityToPerson(person));
    }
}
