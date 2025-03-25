import {sign} from 'jsonwebtoken';
import {Document, model, Schema} from 'mongoose';

import {config} from '@root/configuration';

export interface IUser extends Document {
    login: string;
    email?: string;
    name?: string;
    password: string;
}

export const UserSchema = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, unique: true, required: false},
    name: {type: String},
    password: {type: String, required: true},
});

export const UserModel = model<IUser>('User', UserSchema);

export class User {
    login: string;
    email?: string;
    name?: string;
    password: string;

    static sign({login}: Pick<User, 'login'>) {
        return sign({login, exp: config.session.lifetime}, config.session.secret);
    }
}
