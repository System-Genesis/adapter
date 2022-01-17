import { Types } from 'mongoose';

export interface IOrganizationGroup {
    id?: string;
    name: string;
    // eslint-disable-next-line no-use-before-define
    directManagers?: IPerson[] | string[];
    // eslint-disable-next-line no-use-before-define
    directMembers?: IPerson[] | string[];
    ancestors?: string[] | IOrganizationGroup[];
    children?: IOrganizationGroup[] | string[];
    hierarchy?: string[];
    akaUnit?: string;
    isALeaf?: boolean;
    isAlive?: boolean;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IDomainUser {
    dataSource: string;
    mail?: string;
    hierarchy?: string;
    uniqueID?: string;
    adfsUID?: string;
}

export type ProfilePictureDTO = {
    url: string;
    meta: {
        takenAt?: Date;
        format?: string;
        updatedAt?: Date;
    };
};

export interface IPerson {
    // Person's Basic information
    id?: string;
    identityCard: string;
    personalNumber?: string;
    domainUsers?: Partial<IDomainUser>[];
    entityType: string;
    serviceType?: string;
    firstName: string;
    lastName: string;
    currentUnit?: string;
    status?: string;
    dischargeDay?: Date;
    hierarchy?: string[];
    directGroup: string | Types.ObjectId | IOrganizationGroup;
    managedGroup?: string | Types.ObjectId | IOrganizationGroup;
    rank?: string;
    updatedAt?: Date;
    createdAt?: Date;
    // Editable by the Person
    job: string;
    mail?: string;
    phone?: string[];
    mobilePhone?: string[];
    address?: string;
    // Editable with strong permissions
    responsibility?: string;
    responsibilityLocation?: string | Types.ObjectId | IOrganizationGroup;
    clearance?: string;
    pictures?: {
        profile?: ProfilePictureDTO;
    };
    sex?: string;
    birthDate?: Date;
}
