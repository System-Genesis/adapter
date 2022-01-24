import * as fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const getSpikePublickey = () => {
    return fs.readFileSync(`${__dirname}/../../publickey.pem`);
};
