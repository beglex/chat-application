import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Request, Response} from '@nestjs/common';
import {serialize} from 'cookie';

import {config} from '@root/configuration';
import {User} from '@root/models';
import {ApplicationRequest, ApplicationResponse} from '@root/types';

import {UserService} from '../services/UserService';

const {session: {lifetime: maxAge}} = config;

@Controller('users')
export class UserController {
    constructor(
        private readonly service: UserService,
    ) {
    }

    @Post()
    async create(
        @Body() body: Partial<User>,
    ) {
        return this.service.create(body);
    }

    @Get()
    async get(
    ) {
        return this.service.findAll();
    }

    @Get(':login')
    async getOne(
        @Param('login', ParseUUIDPipe) login: User['login'],
    ) {
        return this.service.findOne(login);
    }

    @Patch(':login')
    async update(
        @Param('login', ParseUUIDPipe) login: User['login'],
        @Body() body: Partial<User>,
    ) {
        return this.service.update(login, body);
    }

    @Delete(':login')
    async delete(
        @Param('login', ParseUUIDPipe) login: User['login'],
    ) {
        return this.service.delete(login);
    }

    @Get('current')
    async current(
        @Request() request: ApplicationRequest,
    ): Promise<User> {
        const {user} = request.data;

        return this.service.findOne(user.login);
    }

    @Post('signin')
    async signIn(
        @Body() body: Pick<User, 'login' | 'password'>,
        @Response() response: ApplicationResponse,
    ) {
        const result = await this.service.signIn(body);

        response.removeHeader('Set-Cookie');
        response.header('Set-Cookie', serialize('token', User.sign(result), {maxAge, path: '/', sameSite: 'lax'}));

        response.send(result);
    }

    @Post('signup')
    async signUp(
        @Body() body: Partial<User>,
        @Response() response: ApplicationResponse,
    ) {
        const result = await this.service.create(body);

        response.removeHeader('Set-Cookie');
        response.header('Set-Cookie', serialize('token', User.sign(result), {maxAge, path: '/', sameSite: 'lax'}));

        response.send(result);
    }

    @Post('signout')
    async signOut(
        @Request() request: ApplicationRequest,
        @Response() response: ApplicationResponse,
    ) {
        const {user} = request.data;

        response.removeHeader('Set-Cookie');
        response.header('Set-Cookie', serialize('token', '', {maxAge: 0, path: '/', sameSite: 'lax'}));

        response.send(user);
    }
}
