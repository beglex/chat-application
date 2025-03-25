import {z} from 'zod';

import {mongo, mongoSchema} from './mongo';
import {redis, redisSchema} from './redis';

export const dataSourcesSchema = z.object({
    mongo: mongoSchema,
    redis: redisSchema,
});

export const dataSources = {
    mongo,
    redis,
} as const;
