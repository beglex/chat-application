import {join} from 'node:path';

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import helmet from 'helmet';

import {ApplicationModule} from '@root/ApplicationModule';
import {config} from '@root/configuration';

const {env, host, port, services: {client}} = config;

async function bootstrap() {
    const logger = new Logger(bootstrap.name);
    const application = await NestFactory.create<NestExpressApplication>(ApplicationModule);

    application.enableCors({origin: client.url, credentials: true});
    application.use(helmet());
    application.setBaseViewsDir(join(__dirname, '..', 'views'));
    application.setViewEngine('hbs');

    application.listen(port, host, () => {
        logger.log(`Listening at http://${host}:${port}/ in ${env} mode`);
    });
}

bootstrap();
