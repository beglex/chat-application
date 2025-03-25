import {z} from 'zod';
import 'dotenv/config';

import {Environment} from '@root/types';

import {dataSources, dataSourcesSchema} from './datasources';
import {services, servicesSchema} from './services';

const schema = z.object({
    env: z.nativeEnum(Environment),
    host: z.string().ip().or(z.literal('localhost')),
    port: z.number().int(),

    session: z.object({
        secret: z.string(),
        lifetime: z.number().int(),
    }),

    services: servicesSchema,
    dataSources: dataSourcesSchema,
});

export const config = schema.parse({
    env: process.env.NODE_ENV as Environment || Environment.DEVELOPMENT,
    host: process.env.HOST || 'localhost',
    port: Number.parseInt(process.env.PORT || '3000'),

    session: {
        secret: process.env.SESSION_SECRET || 'secret',
        lifetime: Number(process.env.SESSION_LIFETIME || 3600),
    },

    services,
    dataSources,
});
