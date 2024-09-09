import { AxiosHttpClient } from './axios-http.client';
import { type HttpPostClient } from '@/business/protocols/http';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
    data: {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        age: faker.number.int(),
        city: faker.word,
    },
    status: faker.number.int(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

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
    test('Should call axios with corret values', async () => {
        const sut = makeSut();
        const request = mockPostRequest();
        await sut.post(request);

        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return the correct statusCode and body', async () => {
        const sut = makeSut();
        const httpResponse = await sut.post(mockPostRequest());

        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data,
        });
    });
});
