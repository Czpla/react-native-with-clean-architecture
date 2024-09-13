import { faker } from '@faker-js/faker';
import axios from 'axios';

export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.post.mockResolvedValue({
        data: {
            name: faker.internet.userName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 100 }),
            city: faker.word.adjective(),
        },
        status: faker.number.int({ min: 0, max: 500 }),
    });

    return mockedAxios;
};
