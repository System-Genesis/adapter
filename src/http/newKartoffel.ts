/* eslint-disable no-plusplus */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
import * as https from 'https';
// import * as getTokenCreator from 'spike-get-token';
import config from '../config/index';
import { EntityDTO, GroupDTO } from '../interfaces/newKartoffel';
import { GetAllGroupsParams, GetPersonsParams, SearchGroupsParams, SearchPersonsParams } from '../interfaces/types';

/* const getToken = getTokenCreator({
    redisHost: config.redis.url,
    ClientId: config.spike.clientId,
    ClientSecret: config.spike.clientSecret,
    spikeURL: config.spike.spikeURL,
    tokenGrantType: 'client_credentials',
    tokenAudience: config.spike.tokenAudience,
    tokenRedisKeyName: config.spike.tokenRedisKeyName,
    spikePublicKeyFullPath: config.spike.spikePublicKeyFullPath,
    useRedis: true,
    httpsValidation: false,
    hostHeader: false,
    retries: 3,
    sleepBetweenRetries: 500,
}); */

const createInstance = (baseurl: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: baseurl,
        paramsSerializer: (params) => new URLSearchParams(params).toString(),
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    /*     axiosInstance.interceptors.request.use(async (configReq: AxiosRequestConfig) => {
        // eslint-disable-next-line no-param-reassign
        configReq.headers!.authorization = await getToken();
    }); */

    return axiosInstance;
};

// get token
export default class NewKartoffel {
    private static kartoffelAxios: AxiosInstance = createInstance(config.kartoffel.baseUrl);

    private static async paginationHandler<T>(url: string, options?: AxiosRequestConfig): Promise<T[]> {
        const { pageSize } = config.kartoffel;
        let finishFetch: boolean = false;
        let arrayObjects: T[] = [];
        let page: number = 1;
        while (!finishFetch) {
            // eslint-disable-next-line no-await-in-loop
            const partOfObjects = (await NewKartoffel.kartoffelAxios.get(url, { ...options, params: { page, pageSize, ...options?.params } })).data;
            arrayObjects = arrayObjects.concat(partOfObjects);
            // eslint-disable-next-line no-unused-expressions
            partOfObjects.length < pageSize ? (finishFetch = true) : (page += 1);
        }

        return arrayObjects;
    }

    private static insertPropToOption<T = Object>(token: string, queryParams?: T, restOptions: Partial<AxiosRequestConfig> = {}): AxiosRequestConfig {
        return { headers: { authorization: token }, params: queryParams, ...restOptions };
    }

    public static async BulkChildIdsHandler(groups: GroupDTO[], token: string): Promise<GroupDTO[]> {
        const groupIDs = groups.map((group) => group.id);
        const { numOfBulk } = config.kartoffel;
        let start = 0;
        let end = numOfBulk;

        while (end > start) {
            // eslint-disable-next-line no-await-in-loop
            const childrenIDS = await Promise.allSettled(groupIDs.slice(start, end).map((id) => NewKartoffel.getChildrenIDsUnderGroup(id, token)));
            for (let indexSubChild = 0; indexSubChild < childrenIDS.length; indexSubChild++) {
                const currentChildrenIDs = childrenIDS[indexSubChild];
                // eslint-disable-next-line no-param-reassign
                groups[start + indexSubChild].children = currentChildrenIDs.status === 'fulfilled' ? currentChildrenIDs.value : [];
            }

            start = end + 1;
            end = Math.min(end + numOfBulk, groupIDs.length);
        }

        return groups;
    }

    public static async getPersonById(id: string, token: string): Promise<EntityDTO> {
        return (await NewKartoffel.kartoffelAxios.get(`/entities/${id}?expanded=true`, NewKartoffel.insertPropToOption(token))).data;
    }

    public static async getPersonByIdentifier(identifier: string, token: string): Promise<EntityDTO> {
        return (await NewKartoffel.kartoffelAxios.get(`/entities/identifier/${identifier}?expanded=true`, NewKartoffel.insertPropToOption(token)))
            .data;
    }

    public static async getPersonByIDomainUser(domainUser: string, token: string): Promise<EntityDTO> {
        if (domainUser.indexOf('@') !== -1) {
            return (
                await NewKartoffel.kartoffelAxios.get(`/entities/digitalIdentity/${domainUser}?expanded=true`, NewKartoffel.insertPropToOption(token))
            ).data;
        }

        const { domainsSuffix } = config;
        try {
            return (
                await Promise.any(
                    domainsSuffix.map(
                        (ds) =>
                            NewKartoffel.kartoffelAxios.get(
                                `/entities/digitalIdentity/${domainUser}@${ds}?expanded=true`,
                                NewKartoffel.insertPropToOption(token),
                            ) as Promise<AxiosResponse<EntityDTO>>,
                    ),
                )
            ).data;
        } catch (error: unknown) {
            // eslint-disable-next-line no-console
            throw error instanceof AggregateError ? error.errors[0] : error;
        }
    }

    public static async searchPersons(params: SearchPersonsParams, token: string): Promise<EntityDTO[]> {
        return (
            await NewKartoffel.kartoffelAxios.get(
                `/entities/search?expanded=true`,
                NewKartoffel.insertPropToOption<SearchPersonsParams>(token, params),
            )
        ).data;
    }

    public static async getPicture(identifier: string, token: string): Promise<AxiosResponse<any>> {
        return NewKartoffel.kartoffelAxios.get(
            `/entities/${identifier}/pictures/profile`,
            NewKartoffel.insertPropToOption(token, {}, { responseType: 'stream' }),
        );
    }

    public static async getPersons(params: GetPersonsParams, token: string): Promise<EntityDTO[]> {
        return NewKartoffel.paginationHandler<EntityDTO>(`/entities?expanded=true`, NewKartoffel.insertPropToOption<GetPersonsParams>(token, params));
    }

    public static async getPersonsUnderGroup(groupId: string, direct: boolean, token: string): Promise<EntityDTO[]> {
        return NewKartoffel.paginationHandler<EntityDTO>(
            `entities/group/${groupId}?expanded=true`,
            NewKartoffel.insertPropToOption(token, { direct }),
        );
    }

    public static async getGroupById(id: string, populateChildren: boolean, token: string): Promise<GroupDTO> {
        const group: GroupDTO = (await NewKartoffel.kartoffelAxios.get(`/groups/${id}`, NewKartoffel.insertPropToOption(token))).data;
        group.children = populateChildren
            ? await NewKartoffel.getChildrenUnderGroup(id, true, token, false)
            : await NewKartoffel.getChildrenIDsUnderGroup(id, token);

        return group;
    }

    public static async getGroupByHierarchy(hierarchy: string, token: string): Promise<GroupDTO> {
        const hierarchyToUri = encodeURIComponent(hierarchy);
        const group: GroupDTO = (await NewKartoffel.kartoffelAxios.get(`/groups/hierarchy/${hierarchyToUri}`, NewKartoffel.insertPropToOption(token)))
            .data;
        group.children = await NewKartoffel.getChildrenIDsUnderGroup(group.id, token);

        return group;
    }

    public static async searchGroups(params: SearchGroupsParams, token: string): Promise<GroupDTO[]> {
        const groups = (await NewKartoffel.kartoffelAxios.get(`/groups/search`, NewKartoffel.insertPropToOption<SearchGroupsParams>(token, params)))
            .data;

        return NewKartoffel.BulkChildIdsHandler(groups, token);
    }

    public static async getGroups(params: GetAllGroupsParams, token: string): Promise<GroupDTO[]> {
        const groups: GroupDTO[] = await NewKartoffel.paginationHandler<GroupDTO>(
            `groups`,
            NewKartoffel.insertPropToOption<GetAllGroupsParams>(token, params),
        );

        return NewKartoffel.BulkChildIdsHandler(groups, token);
    }

    public static async getChildrenUnderGroup(id: string, direct: boolean, token: string, toIds: boolean = false): Promise<GroupDTO[]> {
        const groups: GroupDTO[] = await NewKartoffel.paginationHandler<GroupDTO>(
            `/groups/${id}/children`,
            NewKartoffel.insertPropToOption(token, { direct }),
        );
        if (toIds) return groups;
        return NewKartoffel.BulkChildIdsHandler(groups, token);
    }

    public static async getChildrenIDsUnderGroup(id: string, token: string): Promise<string[]> {
        const children = await NewKartoffel.getChildrenUnderGroup(id, true, token, true);
        return children.map((child) => child.id);
    }

    public static async checkPathExists(path: string, token: string): Promise<any> {
        const groupNames: string[] = path.split('/');
        const groups: PromiseSettledResult<GroupDTO>[] = await Promise.allSettled(
            groupNames.map((_, index) => NewKartoffel.getGroupByHierarchy(groupNames.slice(0, index + 1).join('/'), token)),
        );

        if (groups[0].status === 'rejected' && groups[0].reason.response?.status !== 404) throw groups[0].reason;
        const pathExists = groups.reduce(
            (groupIDs, currentGroupResult, index) => ({
                ...groupIDs,
                [groupNames.slice(0, index + 1).join('/')]: currentGroupResult.status === 'fulfilled' ? currentGroupResult.value.id : null,
            }),
            {},
        );

        return pathExists;
    }
}
