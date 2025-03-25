import type {TestingModule} from '@nestjs/testing';

import {Test} from '@nestjs/testing';

import {AppController} from '../../src/controllers';
import {AppService} from '../../src/services';

describe(AppController.name, () => {
    let controller: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        controller = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(controller.get()).toBe('Hello World!');
        });
    });
});
