import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpStatusCode, type HttpPostClient } from '@/business/protocols/http';
import { type Authentication } from '@/domain/usecases';
import { type Account } from '@/domain/entities';

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
