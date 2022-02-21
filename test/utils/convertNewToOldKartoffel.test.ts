import { convertDigitalIdentityToDomainUser, convertGroupToOrganizationGroup, convertEntityToPerson } from '../../src/utils/convertNewToOldKartoffel';
import { DigitalIdentityDTO, EntityDTO, GroupDTO } from '../../src/interfaces/newKartoffel';
import { IOrganizationGroup, IPerson, IDomainUser } from '../../src/interfaces/oldKartoffel';

describe('Convert kartoffel v2 to v1', () => {
    describe('test from convertDigitalIdentityToDomainUser', () => {
        const digitalIdentity: DigitalIdentityDTO = {
            uniqueId: 'jerald.oconnell58@leonardo.com',
            type: 'domainUser',
            source: 'sf_name',
            mail: 'gardner_oreilly14@leonardo.com',
            isRoleAttachable: true,
            createdAt: new Date('2021-11-24T13:21:38.741Z'),
            updatedAt: new Date('2021-11-24T13:21:38.741Z'),
            entityId: '619e3179f235dc0018469ca8',
            role: {
                hierarchyIds: [
                    '619e3225f235dc0018470a22',
                    '619e321cf235dc0018470460',
                    '619e3210f235dc001846fb0a',
                    '619e31fef235dc001846f10b',
                    '619e31f5f235dc001846e872',
                    '619e31e9f235dc001846e2f7',
                    '619e3193f235dc001846bb4f',
                ],
                roleId: 'jerald.oconnell58@leonardo',
                source: 'sf_name',
                jobTitle: 'unknown',
                directGroup: '619e3225f235dc0018470a22',
                createdAt: new Date('2021-11-24T13:21:38.741Z'),
                updatedAt: new Date('2021-11-24T13:21:38.741Z'),
                digitalIdentityUniqueId: 'jerald.oconnell58@leonardo.com',
                displayName: "sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Jerald O'Connell",
                hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
            },
        };
        const domainUser: IDomainUser = {
            uniqueID: 'jerald.oconnell58@leonardo.com',
            adfsUID: 'jerald.oconnell58@leonardo',
            mail: 'gardner_oreilly14@leonardo.com',
            dataSource: 'sf_name',
            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
        };
        it('should convert di to domainUser', () => {
            expect(convertDigitalIdentityToDomainUser(digitalIdentity)).toEqual(domainUser);
        });
    });
    describe('test from convertGroupToOrganizationGroup', () => {
        const oldGroup: IOrganizationGroup = {
            id: '619e3225f235dc0018470a22',
            name: 'consequatur',
            createdAt: new Date('2021-11-24T12:38:00.712Z'),
            updatedAt: new Date('2021-11-24T12:38:00.712Z'),
            children: ['619e35e5e4de0300121cb675', '619e3618e4de0300121cddcf'],
            ancestors: [
                '619e321cf235dc0018470460',
                '619e3210f235dc001846fb0a',
                '619e31fef235dc001846f10b',
                '619e31f5f235dc001846e872',
                '619e31e9f235dc001846e2f7',
                '619e3193f235dc001846bb4f',
            ],
            hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam'],
            isALeaf: false,
        };
        const newGroup: GroupDTO = {
            children: ['619e35e5e4de0300121cb675', '619e3618e4de0300121cddcf'],
            ancestors: [
                '619e321cf235dc0018470460',
                '619e3210f235dc001846fb0a',
                '619e31fef235dc001846f10b',
                '619e31f5f235dc001846e872',
                '619e31e9f235dc001846e2f7',
                '619e3193f235dc001846bb4f',
            ],
            isLeaf: false,
            name: 'consequatur',
            source: 'sf_name',
            directGroup: '619e321cf235dc0018470460',
            status: 'active',
            createdAt: new Date('2021-11-24T12:38:00.712Z'),
            updatedAt: new Date('2021-11-24T12:38:00.712Z'),
            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam',
            id: '619e3225f235dc0018470a22',
        };
        const newGroupExpanded: GroupDTO = {
            ...newGroup,
            children: [
                {
                    isLeaf: true,
                    ancestors: [
                        '619e3225f235dc0018470a22',
                        '619e321cf235dc0018470460',
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    name: 'rerum',
                    source: 'sf_name',
                    directGroup: '619e3225f235dc0018470a22',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:55:24.767Z'),
                    updatedAt: new Date('2021-11-24T12:55:24.767Z'),
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    id: '619e35e5e4de0300121cb675',
                },
                {
                    isLeaf: true,
                    ancestors: [
                        '619e3225f235dc0018470a22',
                        '619e321cf235dc0018470460',
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    name: 'laboriosam',
                    source: 'sf_name',
                    directGroup: '619e3225f235dc0018470a22',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:56:59.256Z'),
                    updatedAt: new Date('2021-11-24T12:56:59.256Z'),
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    id: '619e3618e4de0300121cddcf',
                },
            ],
            ancestors: [
                {
                    isLeaf: false,
                    ancestors: [
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    name: 'magnam',
                    source: 'sf_name',
                    directGroup: '619e3210f235dc001846fb0a',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:37:53.531Z'),
                    updatedAt: new Date('2021-11-24T12:37:53.531Z'),
                    hierarchy: 'sf_name/nemo/quo/quo/commodi',
                    id: '619e321cf235dc0018470460',
                    children: ['619e3225f235dc0018470a22', '619e322bf235dc0018470d71', '619e3618e4de0300121cddf7', '619e3621e4de0300121ce3ca'],
                },
                {
                    isLeaf: false,
                    ancestors: ['619e31fef235dc001846f10b', '619e31f5f235dc001846e872', '619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    name: 'commodi',
                    source: 'sf_name',
                    directGroup: '619e31fef235dc001846f10b',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:37:38.903Z'),
                    updatedAt: new Date('2021-11-24T12:37:38.903Z'),
                    hierarchy: 'sf_name/nemo/quo/quo',
                    id: '619e3210f235dc001846fb0a',
                    children: [
                        '619e3218f235dc001847021d',
                        '619e321bf235dc00184703e6',
                        '619e321cf235dc0018470460',
                        '619e321df235dc001847052b',
                        '619e321df235dc0018470564',
                    ],
                },
                {
                    isLeaf: false,
                    ancestors: ['619e31f5f235dc001846e872', '619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    name: 'quo',
                    source: 'sf_name',
                    directGroup: '619e31f5f235dc001846e872',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:37:25.185Z'),
                    updatedAt: new Date('2021-11-24T12:37:25.185Z'),
                    hierarchy: 'sf_name/nemo/quo',
                    id: '619e31fef235dc001846f10b',
                    children: [
                        '619e320bf235dc001846f942',
                        '619e320ef235dc001846fac4',
                        '619e320ff235dc001846faef',
                        '619e3210f235dc001846faff',
                        '619e3210f235dc001846fb0a',
                        '619e3210f235dc001846fb30',
                    ],
                },
                {
                    isLeaf: false,
                    ancestors: ['619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    name: 'quo',
                    source: 'sf_name',
                    directGroup: '619e31e9f235dc001846e2f7',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:37:12.359Z'),
                    updatedAt: new Date('2022-01-24T11:25:01.489Z'),
                    hierarchy: 'sf_name/nemo',
                    id: '619e31f5f235dc001846e872',
                    children: [
                        '619e31fef235dc001846f10b',
                        '61bb4647e4de0300121de442',
                        '61ee8bc4f302e80019bba6a5',
                        '61ee8bc8f302e80019bba6ae',
                        '61ee8bcbf302e80019bba6b7',
                        '61ee8bd0f302e80019bba6c0',
                        '61ee8c7af302e80019bba6e4',
                        '61ee8c8df302e80019bba6ed',
                    ],
                },
                {
                    isLeaf: false,
                    ancestors: ['619e3193f235dc001846bb4f'],
                    name: 'nemo',
                    source: 'sf_name',
                    directGroup: '619e3193f235dc001846bb4f',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:37:05.273Z'),
                    updatedAt: new Date('2021-11-24T12:37:05.273Z'),
                    hierarchy: 'sf_name',
                    id: '619e31e9f235dc001846e2f7',
                    children: ['619e31f5f235dc001846e872'],
                },
                {
                    isLeaf: false,
                    ancestors: [],
                    name: 'sf_name',
                    directGroup: null,
                    source: 'sf_name',
                    status: 'active',
                    createdAt: new Date('2021-11-24T12:36:20.116Z'),
                    updatedAt: new Date('2021-12-14T07:22:48.752Z'),
                    diPrefix: '1234',
                    hierarchy: '',
                    id: '619e3193f235dc001846bb4f',
                    children: ['619e31e9f235dc001846e2f7'],
                },
            ],
            directEntities: [
                {
                    phone: [],
                    mobilePhone: [],
                    firstName: 'Jerald',
                    lastName: "O'Connell",
                    entityType: 'agumon',
                    personalNumber: '58950044',
                    identityCard: '3632700',
                    sex: 'female',
                    serviceType: 'A',
                    dischargeDay: new Date('2028-01-08T15:21:27.675Z'),
                    createdAt: new Date('2021-11-24T12:35:05.723Z'),
                    updatedAt: new Date('2021-11-24T12:36:51.540Z'),
                    displayName: "sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Jerald O'Connell",
                    directGroup: '619e3225f235dc0018470a22',
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    jobTitle: 'unknown',
                    fullName: "Jerald O'Connell",
                    mail: 'gardner_oreilly14@leonardo.com',
                    digitalIdentities: [
                        {
                            uniqueId: 'jerald.oconnell58@leonardo.com',
                            type: 'domainUser',
                            source: 'sf_name',
                            mail: 'gardner_oreilly14@leonardo.com',
                            isRoleAttachable: true,
                            createdAt: new Date('2021-11-24T13:21:38.741Z'),
                            updatedAt: new Date('2021-11-24T13:21:38.741Z'),
                            entityId: '619e3179f235dc0018469ca8',
                            role: {
                                hierarchyIds: [
                                    '619e3225f235dc0018470a22',
                                    '619e321cf235dc0018470460',
                                    '619e3210f235dc001846fb0a',
                                    '619e31fef235dc001846f10b',
                                    '619e31f5f235dc001846e872',
                                    '619e31e9f235dc001846e2f7',
                                    '619e3193f235dc001846bb4f',
                                ],
                                roleId: 'jerald.oconnell58@leonardo',
                                source: 'sf_name',
                                jobTitle: 'unknown',
                                directGroup: '619e3225f235dc0018470a22',
                                createdAt: new Date('2021-11-24T13:21:38.741Z'),
                                updatedAt: new Date('2021-11-24T13:21:38.741Z'),
                                digitalIdentityUniqueId: 'jerald.oconnell58@leonardo.com',
                                displayName: "sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Jerald O'Connell",
                                hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                            },
                        },
                    ],
                    id: '619e3179f235dc0018469ca8',
                },
                {
                    phone: [],
                    mobilePhone: [],
                    firstName: 'Britney',
                    lastName: 'Gerhold',
                    entityType: 'agumon',
                    personalNumber: '61477202',
                    sex: 'female',
                    serviceType: 'A',
                    dischargeDay: new Date('2026-11-29T08:46:30.327Z'),
                    createdAt: new Date('2021-11-24T12:36:14.842Z'),
                    updatedAt: new Date('2021-11-24T12:56:58.142Z'),
                    displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Britney Gerhold',
                    directGroup: '619e3225f235dc0018470a22',
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    jobTitle: 'unknown',
                    fullName: 'Britney Gerhold',
                    mail: 'lilyan31@leonardo.com',
                    digitalIdentities: [
                        {
                            uniqueId: 'britney.gerhold62@leonardo.com',
                            type: 'domainUser',
                            source: 'sf_name',
                            mail: 'lilyan31@leonardo.com',
                            isRoleAttachable: true,
                            createdAt: new Date('2021-11-24T19:47:13.217Z'),
                            updatedAt: new Date('2021-11-24T19:47:13.217Z'),
                            entityId: '619e31a6f235dc001846c8fe',
                            role: {
                                hierarchyIds: [
                                    '619e3225f235dc0018470a22',
                                    '619e321cf235dc0018470460',
                                    '619e3210f235dc001846fb0a',
                                    '619e31fef235dc001846f10b',
                                    '619e31f5f235dc001846e872',
                                    '619e31e9f235dc001846e2f7',
                                    '619e3193f235dc001846bb4f',
                                ],
                                roleId: 'britney.gerhold62@leonardo',
                                source: 'sf_name',
                                jobTitle: 'unknown',
                                directGroup: '619e3225f235dc0018470a22',
                                createdAt: new Date('2021-11-24T19:47:13.217Z'),
                                updatedAt: new Date('2021-11-24T19:47:13.217Z'),
                                digitalIdentityUniqueId: 'britney.gerhold62@leonardo.com',
                                displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Britney Gerhold',
                                hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                            },
                        },
                    ],
                    id: '619e31a6f235dc001846c8fe',
                },
                {
                    phone: [],
                    mobilePhone: [],
                    firstName: 'Monty',
                    lastName: 'Hane',
                    entityType: 'agumon',
                    personalNumber: '19438752',
                    identityCard: '7859275',
                    rank: 'rookie',
                    sex: 'male',
                    serviceType: 'E',
                    dischargeDay: new Date('2023-02-11T18:31:27.506Z'),
                    createdAt: new Date('2021-11-24T12:36:38.667Z'),
                    updatedAt: new Date('2021-11-24T12:57:53.707Z'),
                    displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Monty Hane',
                    directGroup: '619e3225f235dc0018470a22',
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    jobTitle: 'unknown',
                    fullName: 'Monty Hane',
                    mail: 'armand.kuhn@leonardo.com',
                    digitalIdentities: [
                        {
                            uniqueId: 'monty67@leonardo.com',
                            type: 'domainUser',
                            source: 'sf_name',
                            mail: 'armand.kuhn@leonardo.com',
                            isRoleAttachable: true,
                            createdAt: new Date('2021-11-24T13:23:56.544Z'),
                            updatedAt: new Date('2021-11-24T13:23:56.544Z'),
                            entityId: '619e31c0f235dc001846dbbb',
                            role: {
                                hierarchyIds: [
                                    '619e3225f235dc0018470a22',
                                    '619e321cf235dc0018470460',
                                    '619e3210f235dc001846fb0a',
                                    '619e31fef235dc001846f10b',
                                    '619e31f5f235dc001846e872',
                                    '619e31e9f235dc001846e2f7',
                                    '619e3193f235dc001846bb4f',
                                ],
                                roleId: 'monty67@leonardo',
                                source: 'sf_name',
                                jobTitle: 'unknown',
                                directGroup: '619e3225f235dc0018470a22',
                                createdAt: new Date('2021-11-24T13:23:56.544Z'),
                                updatedAt: new Date('2021-11-24T13:23:56.544Z'),
                                digitalIdentityUniqueId: 'monty67@leonardo.com',
                                displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Monty Hane',
                                hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                            },
                        },
                    ],
                    id: '619e31c0f235dc001846dbbb',
                },
                {
                    phone: [],
                    mobilePhone: [],
                    firstName: 'Cayla',
                    lastName: 'Beahan',
                    entityType: 'agumon',
                    personalNumber: '1275760',
                    rank: 'champion',
                    akaUnit: 'ads1',
                    clearance: '3',
                    sex: 'male',
                    serviceType: 'E',
                    dischargeDay: new Date('2025-11-24T10:00:45.770Z'),
                    birthDate: new Date(new Date('2001-11-07T16:03:28.309Z')),
                    createdAt: new Date('2021-12-06T23:54:54.499Z'),
                    updatedAt: new Date('2022-01-22T21:59:28.088Z'),
                    displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Cayla Beahan',
                    directGroup: '619e3225f235dc0018470a22',
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    jobTitle: 'unknown',
                    fullName: 'Cayla Beahan',
                    mail: 'gina.becker@leonardo.com',
                    digitalIdentities: [
                        {
                            uniqueId: 'cayla.beahan43@leonardo.com',
                            type: 'domainUser',
                            source: 'sf_name',
                            mail: 'gina.becker@leonardo.com',
                            isRoleAttachable: true,
                            createdAt: new Date('2022-01-22T21:59:29.757Z'),
                            updatedAt: new Date('2022-01-22T21:59:29.757Z'),
                            entityId: '61aea2cee4de0300121de329',
                            role: {
                                hierarchyIds: [
                                    '619e3225f235dc0018470a22',
                                    '619e321cf235dc0018470460',
                                    '619e3210f235dc001846fb0a',
                                    '619e31fef235dc001846f10b',
                                    '619e31f5f235dc001846e872',
                                    '619e31e9f235dc001846e2f7',
                                    '619e3193f235dc001846bb4f',
                                ],
                                roleId: 'cayla.beahan43@leonardo',
                                source: 'sf_name',
                                jobTitle: 'unknown',
                                directGroup: '619e3225f235dc0018470a22',
                                createdAt: new Date('2022-01-22T21:59:29.757Z'),
                                updatedAt: new Date('2022-01-22T21:59:29.757Z'),
                                digitalIdentityUniqueId: 'cayla.beahan43@leonardo.com',
                                displayName: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Cayla Beahan',
                                hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                            },
                        },
                    ],
                    id: '61aea2cee4de0300121de329',
                },
            ],
        };
        const oldGroupPopulate: IOrganizationGroup = {
            ...oldGroup,
            children: [
                {
                    id: '619e35e5e4de0300121cb675',
                    name: 'rerum',
                    isALeaf: true,
                    createdAt: new Date('2021-11-24T12:55:24.767Z'),
                    updatedAt: new Date('2021-11-24T12:55:24.767Z'),
                    ancestors: [
                        '619e3225f235dc0018470a22',
                        '619e321cf235dc0018470460',
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                },
                {
                    id: '619e3618e4de0300121cddcf',
                    name: 'laboriosam',
                    isALeaf: true,
                    createdAt: new Date('2021-11-24T12:56:59.256Z'),
                    updatedAt: new Date('2021-11-24T12:56:59.256Z'),
                    ancestors: [
                        '619e3225f235dc0018470a22',
                        '619e321cf235dc0018470460',
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                },
            ],
            ancestors: [
                {
                    id: '619e321cf235dc0018470460',
                    name: 'magnam',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:37:53.531Z'),
                    updatedAt: new Date('2021-11-24T12:37:53.531Z'),
                    children: ['619e3225f235dc0018470a22', '619e322bf235dc0018470d71', '619e3618e4de0300121cddf7', '619e3621e4de0300121ce3ca'],
                    ancestors: [
                        '619e3210f235dc001846fb0a',
                        '619e31fef235dc001846f10b',
                        '619e31f5f235dc001846e872',
                        '619e31e9f235dc001846e2f7',
                        '619e3193f235dc001846bb4f',
                    ],
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi'],
                },
                {
                    id: '619e3210f235dc001846fb0a',
                    name: 'commodi',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:37:38.903Z'),
                    updatedAt: new Date('2021-11-24T12:37:38.903Z'),
                    children: [
                        '619e3218f235dc001847021d',
                        '619e321bf235dc00184703e6',
                        '619e321cf235dc0018470460',
                        '619e321df235dc001847052b',
                        '619e321df235dc0018470564',
                    ],
                    ancestors: ['619e31fef235dc001846f10b', '619e31f5f235dc001846e872', '619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo'],
                },
                {
                    id: '619e31fef235dc001846f10b',
                    name: 'quo',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:37:25.185Z'),
                    updatedAt: new Date('2021-11-24T12:37:25.185Z'),
                    children: [
                        '619e320bf235dc001846f942',
                        '619e320ef235dc001846fac4',
                        '619e320ff235dc001846faef',
                        '619e3210f235dc001846faff',
                        '619e3210f235dc001846fb0a',
                        '619e3210f235dc001846fb30',
                    ],
                    ancestors: ['619e31f5f235dc001846e872', '619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    hierarchy: ['sf_name', 'nemo', 'quo'],
                },
                {
                    id: '619e31f5f235dc001846e872',
                    name: 'quo',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:37:12.359Z'),
                    updatedAt: new Date('2022-01-24T11:25:01.489Z'),
                    children: [
                        '619e31fef235dc001846f10b',
                        '61bb4647e4de0300121de442',
                        '61ee8bc4f302e80019bba6a5',
                        '61ee8bc8f302e80019bba6ae',
                        '61ee8bcbf302e80019bba6b7',
                        '61ee8bd0f302e80019bba6c0',
                        '61ee8c7af302e80019bba6e4',
                        '61ee8c8df302e80019bba6ed',
                    ],
                    ancestors: ['619e31e9f235dc001846e2f7', '619e3193f235dc001846bb4f'],
                    hierarchy: ['sf_name', 'nemo'],
                },
                {
                    id: '619e31e9f235dc001846e2f7',
                    name: 'nemo',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:37:05.273Z'),
                    updatedAt: new Date('2021-11-24T12:37:05.273Z'),
                    children: ['619e31f5f235dc001846e872'],
                    ancestors: ['619e3193f235dc001846bb4f'],
                    hierarchy: ['sf_name'],
                },
                {
                    id: '619e3193f235dc001846bb4f',
                    name: 'sf_name',
                    isALeaf: false,
                    createdAt: new Date('2021-11-24T12:36:20.116Z'),
                    updatedAt: new Date('2021-12-14T07:22:48.752Z'),
                    children: ['619e31e9f235dc001846e2f7'],
                    ancestors: [],
                    hierarchy: [''],
                },
            ],
            directMembers: [
                {
                    _id: '619e3179f235dc0018469ca8',
                    id: '619e3179f235dc0018469ca8',
                    identityCard: '3632700',
                    personalNumber: '58950044',
                    firstName: 'Jerald',
                    lastName: "O'Connell",
                    serviceType: 'A',
                    entityType: 'agumon',
                    dischargeDay: new Date('2028-01-08T15:21:27.675Z'),
                    directGroup: '619e3225f235dc0018470a22',
                    updatedAt: new Date('2021-11-24T12:36:51.540Z'),
                    createdAt: new Date('2021-11-24T12:35:05.723Z'),
                    job: 'unknown',
                    mail: 'gardner_oreilly14@leonardo.com',
                    phone: [],
                    mobilePhone: [],
                    sex: 'female',
                    fullName: "Jerald O'Connell",
                    status: 'active',
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                    domainUsers: [
                        {
                            uniqueID: 'jerald.oconnell58@leonardo.com',
                            adfsUID: 'jerald.oconnell58@leonardo',
                            mail: 'gardner_oreilly14@leonardo.com',
                            dataSource: 'sf_name',
                            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                        },
                    ],
                },
                {
                    _id: '619e31a6f235dc001846c8fe',
                    id: '619e31a6f235dc001846c8fe',
                    personalNumber: '61477202',
                    firstName: 'Britney',
                    lastName: 'Gerhold',
                    serviceType: 'A',
                    entityType: 'agumon',
                    dischargeDay: new Date('2026-11-29T08:46:30.327Z'),
                    directGroup: '619e3225f235dc0018470a22',
                    updatedAt: new Date('2021-11-24T12:56:58.142Z'),
                    createdAt: new Date('2021-11-24T12:36:14.842Z'),
                    job: 'unknown',
                    mail: 'lilyan31@leonardo.com',
                    phone: [],
                    mobilePhone: [],
                    sex: 'female',
                    fullName: 'Britney Gerhold',
                    status: 'active',
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                    domainUsers: [
                        {
                            uniqueID: 'britney.gerhold62@leonardo.com',
                            adfsUID: 'britney.gerhold62@leonardo',
                            mail: 'lilyan31@leonardo.com',
                            dataSource: 'sf_name',
                            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                        },
                    ],
                },
                {
                    _id: '619e31c0f235dc001846dbbb',
                    id: '619e31c0f235dc001846dbbb',
                    identityCard: '7859275',
                    personalNumber: '19438752',
                    firstName: 'Monty',
                    lastName: 'Hane',
                    serviceType: 'E',
                    entityType: 'agumon',
                    dischargeDay: new Date('2023-02-11T18:31:27.506Z'),
                    directGroup: '619e3225f235dc0018470a22',
                    rank: 'rookie',
                    updatedAt: new Date('2021-11-24T12:57:53.707Z'),
                    createdAt: new Date('2021-11-24T12:36:38.667Z'),
                    job: 'unknown',
                    mail: 'armand.kuhn@leonardo.com',
                    phone: [],
                    mobilePhone: [],
                    sex: 'male',
                    fullName: 'Monty Hane',
                    status: 'active',
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                    domainUsers: [
                        {
                            uniqueID: 'monty67@leonardo.com',
                            adfsUID: 'monty67@leonardo',
                            mail: 'armand.kuhn@leonardo.com',
                            dataSource: 'sf_name',
                            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                        },
                    ],
                },
                {
                    _id: '61aea2cee4de0300121de329',
                    id: '61aea2cee4de0300121de329',
                    personalNumber: '1275760',
                    firstName: 'Cayla',
                    lastName: 'Beahan',
                    serviceType: 'E',
                    entityType: 'agumon',
                    dischargeDay: new Date('2025-11-24T10:00:45.770Z'),
                    directGroup: '619e3225f235dc0018470a22',
                    rank: 'champion',
                    updatedAt: new Date('2022-01-22T21:59:28.088Z'),
                    createdAt: new Date('2021-12-06T23:54:54.499Z'),
                    job: 'unknown',
                    mail: 'gina.becker@leonardo.com',
                    phone: [],
                    mobilePhone: [],
                    clearance: '3',
                    sex: 'male',
                    birthDate: new Date('2001-11-07T16:03:28.309Z'),
                    currentUnit: 'ads1',
                    fullName: 'Cayla Beahan',
                    status: 'active',
                    hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
                    domainUsers: [
                        {
                            uniqueID: 'cayla.beahan43@leonardo.com',
                            adfsUID: 'cayla.beahan43@leonardo',
                            mail: 'gina.becker@leonardo.com',
                            dataSource: 'sf_name',
                            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                        },
                    ],
                },
            ],
        };
        it('should convert group to organizationGroup', () => {
            expect(convertGroupToOrganizationGroup(newGroup)).toEqual(oldGroup);
        });
        it('should convert group expanded to organizationGroup populate', () => {
            expect(convertGroupToOrganizationGroup(newGroupExpanded)).toEqual(oldGroupPopulate);
        });
    });
    describe('test from convertEntityToPerson', () => {
        const oldPerson: IPerson = {
            _id: '619e3179f235dc0018469ca8',
            id: '619e3179f235dc0018469ca8',
            identityCard: '3632700',
            personalNumber: '58950044',
            firstName: 'Jerald',
            lastName: "O'Connell",
            serviceType: 'A',
            entityType: 'agumon',
            dischargeDay: new Date('2028-01-08T15:21:27.675Z'),
            directGroup: '619e3225f235dc0018470a22',
            updatedAt: new Date('2021-11-24T12:36:51.540Z'),
            createdAt: new Date('2021-11-24T12:35:05.723Z'),
            job: 'unknown',
            mail: 'gardner_oreilly14@leonardo.com',
            phone: [],
            mobilePhone: [],
            sex: 'female',
            fullName: "Jerald O'Connell",
            status: 'active',
            hierarchy: ['sf_name', 'nemo', 'quo', 'quo', 'commodi', 'magnam', 'consequatur'],
            domainUsers: [
                {
                    uniqueID: 'jerald.oconnell58@leonardo.com',
                    adfsUID: 'jerald.oconnell58@leonardo',
                    mail: 'gardner_oreilly14@leonardo.com',
                    dataSource: 'sf_name',
                    hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                },
            ],
        };
        const newEntity: EntityDTO = {
            phone: [],
            mobilePhone: [],
            firstName: 'Jerald',
            lastName: "O'Connell",
            entityType: 'agumon',
            personalNumber: '58950044',
            identityCard: '3632700',
            sex: 'female',
            serviceType: 'A',
            dischargeDay: new Date('2028-01-08T15:21:27.675Z'),
            createdAt: new Date('2021-11-24T12:35:05.723Z'),
            updatedAt: new Date('2021-11-24T12:36:51.540Z'),
            displayName: "sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Jerald O'Connell",
            directGroup: '619e3225f235dc0018470a22',
            hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
            jobTitle: 'unknown',
            fullName: "Jerald O'Connell",
            mail: 'gardner_oreilly14@leonardo.com',
            digitalIdentities: [
                {
                    uniqueId: 'jerald.oconnell58@leonardo.com',
                    type: 'domainUser',
                    source: 'sf_name',
                    mail: 'gardner_oreilly14@leonardo.com',
                    isRoleAttachable: true,
                    createdAt: new Date('2021-11-24T13:21:38.741Z'),
                    updatedAt: new Date('2021-11-24T13:21:38.741Z'),
                    entityId: '619e3179f235dc0018469ca8',
                    role: {
                        hierarchyIds: [
                            '619e3225f235dc0018470a22',
                            '619e321cf235dc0018470460',
                            '619e3210f235dc001846fb0a',
                            '619e31fef235dc001846f10b',
                            '619e31f5f235dc001846e872',
                            '619e31e9f235dc001846e2f7',
                            '619e3193f235dc001846bb4f',
                        ],
                        roleId: 'jerald.oconnell58@leonardo',
                        source: 'sf_name',
                        jobTitle: 'unknown',
                        directGroup: '619e3225f235dc0018470a22',
                        createdAt: new Date('2021-11-24T13:21:38.741Z'),
                        updatedAt: new Date('2021-11-24T13:21:38.741Z'),
                        digitalIdentityUniqueId: 'jerald.oconnell58@leonardo.com',
                        displayName: "sf_name/nemo/quo/quo/commodi/magnam/consequatur/unknown- Jerald O'Connell",
                        hierarchy: 'sf_name/nemo/quo/quo/commodi/magnam/consequatur',
                    },
                },
            ],
            id: '619e3179f235dc0018469ca8',
        };
        it('should convert entity to person', () => {
            expect(convertEntityToPerson(newEntity)).toEqual(oldPerson);
        });
    });
});
