/* eslint-disable no-use-before-define */
import { DigitalIdentityDTO, EntityDTO, GroupDTO } from '../interfaces/newKartoffel';
import { IPerson, IOrganizationGroup, IDomainUser } from '../interfaces/oldKartoffel';
import { isArrayOfString, removeEmptyValues } from './functionHandler';

export const convertGroupToOrganizationGroup = (group: GroupDTO): IOrganizationGroup => {
    const { id, name, ancestors, akaUnit, isLeaf: isALeaf, createdAt, updatedAt, children, directEntities } = group;
    const oldGroup: IOrganizationGroup = { id, name, akaUnit, isALeaf, createdAt, updatedAt };
    // TODO: is recursive okey?, also, Array<any>? wtf man.
    oldGroup.children = isArrayOfString(children as Array<any>)
        ? (children as string[])
        : children?.map((child) => convertGroupToOrganizationGroup(child));
    oldGroup.ancestors = isArrayOfString(ancestors as Array<any>)
        ? (ancestors as string[])
        : ancestors?.map((ancestor) => convertGroupToOrganizationGroup(ancestor));
    if (directEntities) oldGroup.directMembers = directEntities.map((entity) => convertEntityToPerson(entity));
    oldGroup.hierarchy = group.hierarchy.split('/');
    // TODO: you can use this function in the ResponseHandler class.
    return removeEmptyValues(oldGroup);
};
export const convertDigitalIdentityToDomainUser = (digitalIdentityExpanded: DigitalIdentityDTO): IDomainUser => {
    const { uniqueId: uniqueID, mail, role, source: dataSource } = digitalIdentityExpanded;
    const adfsUID = role?.roleId;
    const hierarchy = role?.hierarchy;

    return <IDomainUser>{ uniqueID, adfsUID, mail, dataSource, hierarchy };
};
// TODO: can we do it generic mapper function? instead of creating 2 variables, pretty sure it`s possible
export const convertEntityToPerson = (entity: EntityDTO): IPerson => {
    const {
        id,
        identityCard,
        personalNumber,
        firstName,
        lastName,
        serviceType,
        entityType,
        dischargeDay,
        directGroup,
        rank,
        updatedAt,
        createdAt,
        jobTitle: job,
        mail,
        phone,
        mobilePhone,
        address,
        clearance,
        pictures,
        sex,
        birthDate,
        akaUnit: currentUnit,
        fullName,
    } = entity;
    const oldPerson: IPerson = {
        _id: id,
        id,
        identityCard,
        personalNumber,
        firstName,
        lastName,
        serviceType,
        entityType,
        dischargeDay,
        directGroup,
        rank,
        updatedAt,
        createdAt,
        job,
        mail,
        phone,
        mobilePhone,
        address,
        clearance,
        pictures,
        sex,
        birthDate,
        currentUnit,
        fullName,
    };
    oldPerson.status = 'active';
    oldPerson.hierarchy = entity.hierarchy?.split('/');
    oldPerson.domainUsers = entity.digitalIdentities?.map((digitalIdentity) => convertDigitalIdentityToDomainUser(digitalIdentity)) || [];

    return removeEmptyValues(oldPerson);
};
