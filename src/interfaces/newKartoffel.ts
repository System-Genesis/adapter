export interface RoleDTO {
    // role as it should be returned to client
    roleId: string;
    jobTitle: string;
    digitalIdentityUniqueId: string;
    directGroup: string;
    clearance: string;
    hierarchy: string;
    hierarchyIds: string[];
    createdAt: Date;
    updatedAt: Date;
    source: string;
}

export interface DigitalIdentityDTO {
    // DI as it should be returned to client
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    role: RoleDTO;
}

export interface GroupDTO {
    // Group as it should be returned to client
    id: string;
    name: string;
    source: string;
    ancestors: string[] | GroupDTO[];
    hierarchy: string;
    akaUnit: string;
    status: string;
    isLeaf: boolean;
    createdAt: Date;
    updatedAt: Date;
    // eslint-disable-next-line no-use-before-define
    directEntities: EntityDTO[];
    directRoles: RoleDTO[];
    children?: string[] | GroupDTO[];
}

export interface EntityDTO {
    // Entity as it should be returned to client
    id: string;
    displayName: string;
    hierarchy: string;
    directGroup: string;
    entityType: string; // enum
    identityCard: string;
    personalNumber: string;
    goalUserId?: string;
    serviceType: string;
    firstName: string;
    lastName: string;
    fullName: string;
    akaUnit: string;
    dischargeDay: Date;
    rank: string; // enum
    mail: string;
    jobTitle: string;
    phone: string[];
    mobilePhone: string[];
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    pictures?: {
        profile?: {
            url: string;
            meta: {
                format: string;
                updatedAt?: Date;
                createdAt: Date;
                takenAt?: Date;
            };
        };
    };
    digitalIdentities: DigitalIdentityDTO[];
}
