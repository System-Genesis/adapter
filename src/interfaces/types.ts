export type SearchGroupsParams = {
    name?: string;
    hierarchy?: string;
    underGroupId?: string;
    nameAndHierarchy?: string;
    status?: string;
};

export type SearchPersonsParams = {
    fullName: string;
    entityType?: string;
    ['digitalIdentity.source']?: string;
    rank?: string;
    underGroupId?: string;
    status?: string;
};

export type GetPersonsParams = {
    entityType?: string;
    ['digitalIdentity.source']?: string;
    rank?: string;
    updatedFrom?: Date;
};

export type searchDigitalIdentitiesParams = {
    uniqueId: string;
};

export type GetAllGroupsParams = {
    updateFrom?: Date;
    akaUnit?: string;
};

export type updatedFrom = {
    from?: Date;
};

export type akaUnit = {
    akaUnit?: string;
};

export type underGroupId = {
    id: string;
};

export type childrenUnderGroupQuery = {
    maxDepth: string;
};

export type populatePerson = 'children' | 'directMembers' | 'ancestors';
