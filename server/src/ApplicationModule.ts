import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {config} from '@root/configuration';
import * as controllers from '@root/controllers';
import * as middleware from '@root/middleware';
import {User, UserSchema} from '@root/models';
import {ChatModule} from '@root/modules';
import * as services from '@root/services';

const {dataSources: {mongo}} = config;

@Module({
    imports: [
        ChatModule,
        MongooseModule.forRoot(
            `mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
        ]),
    ],
    controllers: Object.values(controllers),
    providers: Object.values(services),
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(middleware.LoggerMiddleware)
            .forRoutes('{*splat}');

        consumer.apply(middleware.AuthenticationMiddleware)
            .exclude(
                {path: '/users/signin', method: RequestMethod.POST},
                {path: '/users/signup', method: RequestMethod.POST},
            )
            .forRoutes('{*splat}');
    }
}
