import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    kartoffel: {
        baseUrl: env.get('KARTOFFEL_URL').required().asUrlString(),
        numOfBulk: env.get('BULK_LIMIT').required().asInt(),
        pageSize: env.get('PAGE_SIZE').required().asInt(),
    },
    domainsSuffix: env.get('DOMAINS').required().asArray(),
    spike: {
        clientId: env.get('SPIKE_CLIENT').asString(),
        clientSecret: env.get('SPIKE_SECRET').asString(),
        spikeURL: env.get('SPIKE_URL').asString(),
        tokenAudience: env.get('SPIKE_AUDIENCE').asString(),
        tokenRedisKeyName: env.get('SPIKE_REDIS_KEY').asString(),
        spikePublicKeyFullPath: env.get('SPIKE_PUBLIC_KEY_PATH').asString(),
    },
};

export default config;
