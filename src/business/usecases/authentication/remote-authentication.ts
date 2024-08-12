import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/business/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected-error';
import { type HttpPostClient } from '@/business/protocols/http/http-post-client';
import { type Authentication } from '@/domain/usecases/authentication';
import { type Account } from '@/domain/entities/account-entitie';

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<Authentication.Params, Account>,
    ) {}

    public async auth(params: Authentication.Params): Promise<Account> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params,
        });

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body;
            case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
            default: throw new UnexpectedError();
        }
    }
}
