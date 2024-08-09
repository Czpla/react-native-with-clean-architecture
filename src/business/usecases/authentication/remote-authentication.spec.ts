import { HttpStatusCode } from '@/business/protocols/http/http-response';
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/business/test/mock-http-client';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { type Authentication } from '@/domain/usecases/authentication';
import { type Account } from '@/domain/entities/account-entitie';
import { faker } from '@faker-js/faker';

type SutTypes = {
    sut: RemoteAuthentication;
    httpPostClient: HttpPostClientSpy<Authentication.Params, Account>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClient = new HttpPostClientSpy<Authentication.Params, Account>();
    const sut = new RemoteAuthentication(url, httpPostClient);

    return {
        sut: sut,
        httpPostClient: httpPostClient,
    };
};

describe('RemoteAuthentication', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url();
        const { sut, httpPostClient } = makeSut(url);

        await sut.auth(mockAuthentication());

        expect(httpPostClient.url).toBe(url);
    });

    test('Should call HttpPostClient with correct body', async () => {
        const { sut, httpPostClient } = makeSut();
        const params = mockAuthentication();

        await sut.auth(params);

        expect(httpPostClient.body).toEqual(params);
    });

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClient } = makeSut();

        httpPostClient.response = {
            statusCode: HttpStatusCode.unauthorized,
        };

        const promise = sut.auth(mockAuthentication());

        await expect(promise).rejects.toThrow(new InvalidCredentialsError());
    });

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClient } = makeSut();

        httpPostClient.response = {
            statusCode: HttpStatusCode.badRequest,
        };

        const promise = sut.auth(mockAuthentication());

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClient } = makeSut();

        httpPostClient.response = {
            statusCode: HttpStatusCode.notFound,
        };

        const promise = sut.auth(mockAuthentication());

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const { sut, httpPostClient } = makeSut();

        httpPostClient.response = {
            statusCode: HttpStatusCode.serverError,
        };

        const promise = sut.auth(mockAuthentication());

        await expect(promise).rejects.toThrow(new UnexpectedError());
    });
});
