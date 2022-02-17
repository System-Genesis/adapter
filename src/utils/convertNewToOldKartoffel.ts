/* eslint-disable no-use-before-define */
import { DigitalIdentityDTO, EntityDTO, GroupDTO } from '../interfaces/newKartoffel';
import { IPerson, IOrganizationGroup, IDomainUser } from '../interfaces/oldKartoffel';
import { isArrayOfString, removeEmptyValues } from './functionHandler';

export const convertGroupToOrganizationGroup = (group: GroupDTO): IOrganizationGroup => {
    const { id, name, ancestors, akaUnit, isLeaf: isALeaf, createdAt, updatedAt, children, directEntities } = group;
    const oldGroup: IOrganizationGroup = { id, name, akaUnit, isALeaf, createdAt, updatedAt };
    oldGroup.children = isArrayOfString(children) ? (children as string[]) : children?.map((child) => convertGroupToOrganizationGroup(child));
    oldGroup.ancestors = isArrayOfString(ancestors)
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
    const oldPerson: IPerson = {
        _id: entity.id,
        id: entity.id,
        identityCard: entity.identityCard,
        personalNumber: entity.personalNumber,
        firstName: entity.firstName,
        lastName: entity.lastName,
        serviceType: entity.serviceType,
        entityType: entity.entityType,
        dischargeDay: entity.dischargeDay,
        directGroup: entity.directGroup,
        rank: entity.rank,
        updatedAt: entity.updatedAt,
        createdAt: entity.createdAt,
        job: entity.jobTitle,
        mail: entity.mail,
        phone: entity.phone,
        mobilePhone: entity.mobilePhone,
        address: entity.address,
        clearance: entity.clearance,
        pictures: entity.pictures,
        sex: entity.sex,
        birthDate: entity.birthDate,
        currentUnit: entity.akaUnit,
        fullName: entity.fullName,
    };
    oldPerson.status = 'active';
    oldPerson.hierarchy = entity.hierarchy?.split('/');
    oldPerson.domainUsers = entity.digitalIdentities?.map((digitalIdentity) => convertDigitalIdentityToDomainUser(digitalIdentity)) || [];

    return removeEmptyValues(oldPerson);
};
