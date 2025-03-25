import {Controller, Get, Render} from '@nestjs/common';

import {AppService} from '@root/services';

@Controller()
export class AppController {
    constructor(
        private readonly service: AppService,
    ) {}

    @Get()
    @Render('index')
    get() {
        return {message: this.service.get()};
    }
}
