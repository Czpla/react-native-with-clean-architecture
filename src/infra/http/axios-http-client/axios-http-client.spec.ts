import { AxiosHttpClient } from './axios-http.client';
import { type HttpPostClient } from '@/business/protocols/http';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostClient.Params<any> => ({
    url: faker.internet.url(),
    body: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        age: faker.number.int(),
        city: faker.word,
    },
});

describe('AxiosHttpClient', () => {
    test('Should call axios with corret URL and verb', async () => {
        const sut = makeSut();
        const request = mockPostRequest();
        await sut.post({ url: request.url });

        expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
    });
});
