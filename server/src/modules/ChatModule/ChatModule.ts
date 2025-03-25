import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {MessageSchema, UserSchema} from '@root/models';

import {ChatGateway} from './ChatGateway';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Message', schema: MessageSchema},
            {name: 'User', schema: UserSchema},
        ]),
    ],
    providers: [ChatGateway],
})
export class ChatModule {
}
