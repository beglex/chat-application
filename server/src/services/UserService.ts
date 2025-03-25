import {ForbiddenException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from '@root/models'; // Adjust the import path as necessary

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly Model: Model<User>,
    ) {}

    async create(dto: Partial<User>): Promise<User> {
        const createdUser = new this.Model(dto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.Model.find().exec();
    }

    async findOne(login: User['login']): Promise<User> {
        return this.Model.findOne({login}).exec();
    }

    async update(login: User['login'], dto: Partial<User>): Promise<User> {
        return this.Model.findOneAndUpdate({login}, dto, {new: true}).exec();
    }

    async delete(login: User['login']): Promise<User> {
        return this.Model.findOneAndDelete({login}).exec();
    }

    async signIn(dto: Pick<User, 'login' | 'password'>): Promise<User> {
        const user = await this.Model.findOne({login: dto.login}).exec();
        if (user?.password === dto.password) {
            return user;
        }
        throw new ForbiddenException();
    }

    async signUp(dto: Partial<User>): Promise<User> {
        const user = new this.Model(dto);

        return user.save();
    }
}
