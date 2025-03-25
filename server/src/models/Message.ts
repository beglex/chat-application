import {Document, model, Schema, Types} from 'mongoose';

export interface IMessage extends Document {
    text: string;
    time: Date;
    userId: Types.ObjectId;
}

export const MessageSchema = new Schema<IMessage>({
    text: {type: String, required: true},
    time: {type: Date, default: Date.now()},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

export const MessageModel = model<IMessage>('Message', MessageSchema);

export class Message {
    text: string;
    time: Date;
    userId: Types.ObjectId;
}
