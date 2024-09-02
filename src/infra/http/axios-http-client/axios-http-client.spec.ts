import { AxiosHttpClient } from './axios-http.client';
import axios from 'axios';
import { faker } from '@faker-js/faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
    test('Should call axios with corret URL', async () => {
        const sut = makeSut();
        const url = faker.internet.url();
        await sut.post({ url: url });

        expect(mockedAxios).toHaveBeenCalledWith(url);
    });
});
