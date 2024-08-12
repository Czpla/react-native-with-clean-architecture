import { type Authentication } from '@/domain/usecases';
import { type Account } from '@/domain/entities';
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
});

export const mockAccount = (): Account => ({
    accessToken: faker.string.uuid(),
});
