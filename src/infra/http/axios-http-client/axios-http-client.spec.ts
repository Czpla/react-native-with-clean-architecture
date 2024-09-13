import { mockPostRequest } from '@/business/test';
import { AxiosHttpClient } from './axios-http.client';
import { mockAxios } from '@/infra/test';
import type axios from 'axios';

jest.mock('axios');

type SutTypes = {
    sut: AxiosHttpClient;
    mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();

    return {
        sut: sut,
        mockedAxios: mockedAxios,
    };
};

describe('AxiosHttpClient', () => {
    test('Should call axios with corret values', async () => {
        const request = mockPostRequest();
        const { sut, mockedAxios } = makeSut();
        await sut.post(request);

        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return the correct statusCode and body', () => {
        const { sut, mockedAxios } = makeSut();
        const promisseHttpResponse = sut.post(mockPostRequest());

        expect(promisseHttpResponse).toEqual(mockedAxios.post.mock.results[0].value);
    });
});
