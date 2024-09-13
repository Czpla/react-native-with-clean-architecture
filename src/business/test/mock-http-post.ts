import { type HttpPostClient } from '@/business/protocols/http';
import { faker } from '@faker-js/faker';

export const mockPostRequest = (): HttpPostClient.Params<any> => ({
    url: faker.internet.url(),
    body: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 100 }),
        city: faker.word.adjective(),
    },
});
