/* eslint-disable no-use-before-define */
import { DigitalIdentityDTO, EntityDTO, GroupDTO } from '../interfaces/newKartoffel';
import { IPerson, IOrganizationGroup, IDomainUser } from '../interfaces/oldKartoffel';
import { isArrayOfString, removeEmptyValues } from './functionHandler';

export const convertGroupToOrganizationGroup = (group: GroupDTO): IOrganizationGroup => {
    const { id, name, ancestors, akaUnit, isLeaf: isALeaf, createdAt, updatedAt, children, directEntities } = group;
    const oldGroup: IOrganizationGroup = { id, name, akaUnit, isALeaf, createdAt, updatedAt };
    oldGroup.children = isArrayOfString(children as Array<any>)
        ? (children as string[])
        : children?.map((child) => convertGroupToOrganizationGroup(child));
    oldGroup.ancestors = isArrayOfString(ancestors as Array<any>)
        ? (ancestors as string[])
        : ancestors?.map((ancestor) => convertGroupToOrganizationGroup(ancestor));
    if (directEntities) oldGroup.directMembers = directEntities.map((entity) => convertEntityToPerson(entity));
    oldGroup.hierarchy = group.hierarchy.split('/');

    return removeEmptyValues(oldGroup);
};
export const convertDigitalIdentityToDomainUser = (digitalIdentityExpanded: DigitalIdentityDTO): IDomainUser => {
    const { uniqueId: uniqueID, mail, role, source: dataSource } = digitalIdentityExpanded;
    const adfsUID = role?.roleId;
    const hierarchy = role?.hierarchy;

    return <IDomainUser>{ uniqueID, adfsUID, mail, dataSource, hierarchy };
};

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
    } = entity;
    const oldPerson: IPerson = {
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
    };
    oldPerson.status = 'active';
    oldPerson.hierarchy = entity.hierarchy?.split('/');
    oldPerson.domainUsers = entity.digitalIdentities?.map((digitalIdentity) => convertDigitalIdentityToDomainUser(digitalIdentity)) || [];

    return removeEmptyValues(oldPerson);
};
