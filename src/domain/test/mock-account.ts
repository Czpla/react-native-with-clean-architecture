import { type Authentication } from '@/domain/usecases/authentication';
import { type Account } from '@/domain/entities/account-entitie';
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
});

export const mockAccount = (): Account => ({
    accessToken: faker.string.uuid(),
});
