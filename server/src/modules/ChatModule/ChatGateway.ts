import type {Server, Socket} from 'socket.io';

import {Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {
    MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Model} from 'mongoose';

import {EventNames} from '@root/constants';
import {Message, User} from '@root/models';

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private io: Server;

    private logger = new Logger(ChatGateway.name);

    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
        @InjectModel(User.name) private readonly UserModel: Model<User>,
    ) {
    }

    async handleConnection(client: Socket) {
        this.logger.debug(`Client connected: ${client.id}`);

        const limit = Number.parseInt(client.handshake.query.limit as string) || 10;
        const messages = await this.MessageModel.find().sort({time: -1}).limit(limit);

        client.emit(EventNames.RECENT_MESSAGES, messages);
    }

    handleDisconnect(client: Socket) {
        this.logger.debug(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage(EventNames.MESSAGE_SENT)
    async handleMessage(
        @MessageBody() data: {userId: string; message: string; time: string},
    ) {
        this.logger.debug(data);

        const message = new this.MessageModel(data);

        await message.save();

        this.io.emit(EventNames.NEW_MESSAGE, data);
    }
}
